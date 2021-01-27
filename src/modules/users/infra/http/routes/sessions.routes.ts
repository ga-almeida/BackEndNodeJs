import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsControllers from '@modules/users/infra/http/controllers/SessionsControllers';

const sessionsRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsControllers.create,
);

export default sessionsRouter;
