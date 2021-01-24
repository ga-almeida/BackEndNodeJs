import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('listProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Gabriel Almeida',
      email: 'gabriel@almeida.com.br',
      password: '1234',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Gabriel Santos',
      email: 'gabriel@santos.com.br',
      password: '1234',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Gabriel Logged',
      email: 'gabriel@logged.com.br',
      password: '1234',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
