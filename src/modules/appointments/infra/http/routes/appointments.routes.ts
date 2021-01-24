import { Router } from 'express';

import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAutheticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
