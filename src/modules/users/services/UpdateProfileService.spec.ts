import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'profile-non-existing',
        email: 'gabriel@profile.com',
        name: 'Gabriel Almeida',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@profile.com.br',
      password: '1234',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'gabriel@profile.com',
      name: 'Gabriel Almeida',
    });

    expect(updatedUser.name).toBe('Gabriel Almeida');
    expect(updatedUser.email).toBe('gabriel@profile.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@profile.com.br',
      password: '1234',
    });

    const user = await fakeUsersRepository.create({
      name: 'Gabriel-test',
      email: 'gabriel-test@profile.com.br',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'gabriel@profile.com.br',
        name: 'Gabriel Almeida',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@profile.com.br',
      password: '1234',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'gabriel@profile.com.br',
      name: 'Gabriel Almeida',
      old_password: '1234',
      new_password: '4321',
    });

    expect(updatedUser.password).toBe('4321');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@profile.com.br',
      password: '1234',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'gabriel@profile.com.br',
        name: 'Gabriel Almeida',
        new_password: '4321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@profile.com.br',
      password: '1234',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'gabriel@profile.com.br',
        name: 'Gabriel Almeida',
        new_password: '4321',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
