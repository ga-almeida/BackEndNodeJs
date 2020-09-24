import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import UserMap from '../mappers/UserMap';

const usersRouter = Router();

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

export default usersRouter;
