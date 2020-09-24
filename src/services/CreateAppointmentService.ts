import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const dateAppointment = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      dateAppointment,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already bocked!');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: dateAppointment,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
