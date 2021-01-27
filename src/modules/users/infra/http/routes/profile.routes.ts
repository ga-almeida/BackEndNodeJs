import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAutheticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.when('new_password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('new_password')).required(),
      }),
    },
  }),
  profileController.update,
);

profileRouter.get('/', profileController.show);

export default profileRouter;
