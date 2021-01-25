import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 8, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 9, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 10, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 11, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 12, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 13, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 14, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 15, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 16, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 29, 17, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 30, 8, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 31, 8, 0, 0),
      provider_id: 'user1',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 4, 28, 8, 0, 0),
      provider_id: 'user1',
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      month: 5,
      provider_id: 'user1',
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 28, available: true },
        { day: 29, available: false },
        { day: 30, available: true },
        { day: 31, available: true },
      ]),
    );
  });
});
