import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can changeavatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
