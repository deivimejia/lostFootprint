import { Router } from 'express';
import { PetPostsRoutes } from './pet-posts/routes';
import { UserRoutes } from './users/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/petposts/', PetPostsRoutes.routes);
    return router;
  }
}
