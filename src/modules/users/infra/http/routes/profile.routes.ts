import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAutheticated);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
