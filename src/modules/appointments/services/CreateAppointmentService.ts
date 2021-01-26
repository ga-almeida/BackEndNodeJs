import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
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
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already bocked!', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: dateAppointment,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
