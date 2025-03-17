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

    router.post('/', controller.register);
    router.delete('/:id', controller.delete);
    router.get('/:id', controller.findOne);
    router.get('/', controller.findAll);
    router.patch('/:id', controller.patch);
    router.patch('/:id/approve', controller.patchApprove);
    router.patch('/:id/reject', controller.patchReject);

    return router;
  }
}
