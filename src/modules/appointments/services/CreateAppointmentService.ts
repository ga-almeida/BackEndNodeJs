import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const dateAppointment = startOfHour(date);

    if (isBefore(dateAppointment, Date.now())) {
      throw new AppError("You can't create an appointment os a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(dateAppointment) < 8 || getHours(dateAppointment) > 17) {
      throw new AppError(
        "You can't only create appointments between 8am and 5pm.",
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      dateAppointment,
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already bocked!', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: dateAppointment,
    });

    const dateFormat = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia: ${dateFormat}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointment.date,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
