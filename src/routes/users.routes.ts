import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UserMap from '../mappers/UserMap';
import ensureAutheticated from '../middlewares/ensureAutheticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      email,
      name,
      password,
    });

    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      const mappedUser = UserMap.toDTO(user);

      return response.json({ mappedUser });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  },
);

export default usersRouter;
