import { Router } from 'express';
import UserMap from '../mappers/UserMap';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  const userMaped = UserMap.toDTO(user);

  return response.json({ userMaped, token });
});

export default sessionsRouter;
