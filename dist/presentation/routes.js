"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./pet-posts/routes");
const routes_2 = require("./users/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/users', routes_2.UserRoutes.routes);
        router.use('/api/petposts/', routes_1.PetPostsRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
