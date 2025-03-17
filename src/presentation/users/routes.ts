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

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const eliminatorUserService = new EliminatorUserPostService();
    const finderUserService = new FinderUserPostService();
    const finderUsersService = new FinderUsersPostService();
    const loginUserService = new LoginUserPostService();
    const registerUserService = new RegisterUserPostService();
    const updaterUserService = new UpdaterUserPostService();

    const controller = new UserController(
      eliminatorUserService,
      finderUserService,
      finderUsersService,
      loginUserService,
      registerUserService,
      updaterUserService
    );

    router.delete('/:id', controller.delete);
    router.get('/:id', controller.findOne);
    router.get('/', controller.findAll);
    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.patch('/:id', controller.updater);

    return router;
  }
}
