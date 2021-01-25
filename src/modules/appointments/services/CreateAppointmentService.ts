import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

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
