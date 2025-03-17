"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const services_1 = require("./services");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const eliminatorUserService = new services_1.EliminatorUserPostService();
        const finderUserService = new services_1.FinderUserPostService();
        const finderUsersService = new services_1.FinderUsersPostService();
        const loginUserService = new services_1.LoginUserPostService();
        const registerUserService = new services_1.RegisterUserPostService();
        const updaterUserService = new services_1.UpdaterUserPostService();
        const controller = new controller_1.UserController(eliminatorUserService, finderUserService, finderUsersService, loginUserService, registerUserService, updaterUserService);
        router.delete('/:id', controller.delete);
        router.get('/:id', controller.findOne);
        router.get('/', controller.findAll);
        router.post('/login', controller.login);
        router.post('/register', controller.register);
        router.patch('/:id', controller.updater);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
