import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import UsersControllers from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
