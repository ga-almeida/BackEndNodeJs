import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123456',
      user_id: '1234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appontmentDate = new Date();

    await createAppointmentService.execute({
      date: appontmentDate,
      provider_id: '123456',
      user_id: '1234',
    });

    await expect(
      createAppointmentService.execute({
        date: appontmentDate,
        provider_id: '123456',
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
