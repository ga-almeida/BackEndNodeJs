import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const dateAppointment = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      dateAppointment,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already bocked!', 400);
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: dateAppointment,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
