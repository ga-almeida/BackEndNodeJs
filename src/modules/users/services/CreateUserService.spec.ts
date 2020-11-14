import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository);

    const user = await createUsersService.execute({
      name: 'Gabriel Almeida dos Santos',
      email: 'gabrielsantos.almeida@hotmail.com',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user widh same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(fakeUsersRepository);

    await createUsersService.execute({
      name: 'Gabriel Almeida dos Santos',
      email: 'gabrielsantos.almeida@hotmail.com',
      password: '1234',
    });

    expect(
      createUsersService.execute({
        name: 'Gabriel Almeida dos Santos',
        email: 'gabrielsantos.almeida@hotmail.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
