import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const dateAppointment = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      dateAppointment,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already bocked!');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: dateAppointment,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
