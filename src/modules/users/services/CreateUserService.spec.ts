import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsersService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUsersService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  // it('should be able to create a new user', async () => {
  //   const user = await createUsersService.execute({
  //     name: 'Gabriel Almeida dos Santos',
  //     email: 'gabrielsantos.almeida@hotmail.com',
  //     password: '1234',
  //   });

  //   expect(user).toHaveProperty('id');
  // });

  it('should not be able to create a new user widh same email from another', async () => {
    await createUsersService.execute({
      name: 'Gabriel Almeida',
      email: 'gabrielsantos.almeida@hotmail.com',
      password: '1234',
    });

    await expect(
      createUsersService.execute({
        name: 'Gabriel Almeida dos Santos',
        email: 'gabrielsantos.almeida@hotmail.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
