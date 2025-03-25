import { Router } from 'express';

import { PetPostsController } from './controller';
import {
  ApprovedPetPostService,
  CreatorPetPostService,
  EliminatorPetPostService,
  FinderPetPostService,
  FinderPetsPostService,
  RejectPetPostService,
  UpdaterPetPostService,
} from './services';
import { AuthMiddleware } from '../../common/middleware/authMiddleware';
import { UserRole } from '../../data/postgres/models/user.model';

export class PetPostsRoutes {
  static get routes(): Router {
    const router = Router();
    const creatorPetPostService = new CreatorPetPostService();
    const eliminatorPetPostService = new EliminatorPetPostService();
    const finderPetPostService = new FinderPetPostService();
    const finderPetsPostService = new FinderPetsPostService();
    const updaterPetPostService = new UpdaterPetPostService();
    const approvedPetPostService = new ApprovedPetPostService();
    const rejectPetPostService = new RejectPetPostService();

    const controller = new PetPostsController(
      creatorPetPostService,
      eliminatorPetPostService,
      finderPetPostService,
      finderPetsPostService,
      updaterPetPostService,
      approvedPetPostService,
      rejectPetPostService
    );
    router.use(AuthMiddleware.protect);

    router.post(
      '/',
      AuthMiddleware.restricTo(UserRole.USER),
      controller.register
    );

    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);

    router.patch(
      '/:id',
      AuthMiddleware.restricTo(UserRole.ADMIN),
      controller.patch
    ); //TODO Falta agregar autorización para el usuario creador

    router.delete(
      '/:id',
      AuthMiddleware.restricTo(UserRole.ADMIN),
      controller.delete
    ); //TODO Falta agregar autorización para el usuario creador

    router.use(AuthMiddleware.restricTo(UserRole.ADMIN));
    router.patch('/:id/approve', controller.patchApprove);
    router.patch('/:id/reject', controller.patchReject);

    return router;
  }
}
