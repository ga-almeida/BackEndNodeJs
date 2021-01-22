import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({
      user_id,
    });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, old_password, new_password, email } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const user = await updateProfileService.execute({
      email,
      name,
      user_id,
      new_password,
      old_password,
    });

    return response.json(user);
  }
}
