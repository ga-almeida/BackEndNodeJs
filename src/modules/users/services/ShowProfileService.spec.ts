import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowProfileService from '@modules/users/services/ShowProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel',
      email: 'gabriel@profile.com.br',
      password: '1234',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Gabriel');
    expect(profile.email).toBe('gabriel@profile.com.br');
    expect(profile.password).toBe('1234');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'profile-non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
