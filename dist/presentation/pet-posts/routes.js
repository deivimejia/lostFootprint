"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPostsRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("./services");
class PetPostsRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const creatorPetPostService = new services_1.CreatorPetPostService();
        const eliminatorPetPostService = new services_1.EliminatorPetPostService();
        const finderPetPostService = new services_1.FinderPetPostService();
        const finderPetsPostService = new services_1.FinderPetsPostService();
        const updaterPetPostService = new services_1.UpdaterPetPostService();
        const approvedPetPostService = new services_1.ApprovedPetPostService();
        const rejectPetPostService = new services_1.RejectPetPostService();
        const controller = new controller_1.PetPostsController(creatorPetPostService, eliminatorPetPostService, finderPetPostService, finderPetsPostService, updaterPetPostService, approvedPetPostService, rejectPetPostService);
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
exports.PetPostsRoutes = PetPostsRoutes;
