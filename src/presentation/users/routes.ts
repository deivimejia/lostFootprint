import { Router } from 'express';
import { UserController } from './controller';
import {
  EliminatorUserPostService,
  FinderUserPostService,
  FinderUsersPostService,
  LoginUserPostService,
  RegisterUserPostService,
  UpdaterUserPostService,
} from './services';
import { EmailService } from '../../common/services/email.service';
import { envs } from '../../config';
import { AuthMiddleware } from '../../common/middleware/authMiddleware';
import { UserRole } from '../../data/postgres/models/user.model';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_MAIL
    );
    const eliminatorUserService = new EliminatorUserPostService();
    const finderUserService = new FinderUserPostService();
    const finderUsersService = new FinderUsersPostService();
    const loginUserService = new LoginUserPostService();
    const registerUserService = new RegisterUserPostService(emailService);
    const updaterUserService = new UpdaterUserPostService();

    const controller = new UserController(
      eliminatorUserService,
      finderUserService,
      finderUsersService,
      loginUserService,
      registerUserService,
      updaterUserService
    );

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    router.get('/validate-account/:token', controller.validateAccount);

    router.use(AuthMiddleware.protect);

    router.get('/:id', controller.findOne);

    router.patch(
      '/:id',
      AuthMiddleware.restricTo(UserRole.ADMIN),
      controller.updater
    );
    // TODO agragar autorización para propio usuario

    router.use(AuthMiddleware.restricTo(UserRole.ADMIN));
    router.delete('/:id', controller.delete);
    router.get('/', controller.findAll);

    return router;
  }
}
