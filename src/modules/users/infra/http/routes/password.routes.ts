import { Router } from 'express';

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordControllers = new ForgotPasswordController();
const resetPasswordControllers = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordControllers.create);
passwordRouter.post('/reset', resetPasswordControllers.create);

export default passwordRouter;
