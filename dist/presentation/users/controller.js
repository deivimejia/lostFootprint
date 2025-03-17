"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const domain_1 = require("../../domain");
class UserController {
    constructor(eliminatorUserService, finderUserService, finderUsersService, loginUserService, registerUserService, updaterUserService) {
        this.eliminatorUserService = eliminatorUserService;
        this.finderUserService = finderUserService;
        this.finderUsersService = finderUsersService;
        this.loginUserService = loginUserService;
        this.registerUserService = registerUserService;
        this.updaterUserService = updaterUserService;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ message: 'Something went very wrong 🧨' });
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            this.eliminatorUserService
                .execute(id)
                .then(() => res.status(204).json(null))
                .catch((error) => this.handleError(error, res));
        };
        this.findOne = (req, res) => {
            const { id } = req.params;
            this.finderUserService
                .execute(id)
                .then((user) => res.status(200).json(user))
                .catch((error) => this.handleError(error, res));
        };
        this.findAll = (req, res) => {
            this.finderUsersService
                .execute()
                .then((users) => res.status(200).json(users))
                .catch((error) => this.handleError(error, res));
        };
        this.login = (req, res) => {
            this.loginUserService
                .execute()
                .then((message) => res.status(501).json(message))
                .catch((error) => res.status(400));
        };
        this.register = (req, res) => {
            const [error, createdUserDto] = domain_1.CreatedUserDto.execute(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.registerUserService
                .execute(createdUserDto)
                .then((message) => res.status(201).json(message))
                .catch((error) => this.handleError(error, res));
        };
        this.updater = (req, res) => {
            const { id } = req.params;
            const [error, updaterUserDto] = domain_1.UpdateUserDto.execute(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.updaterUserService
                .execute(id, updaterUserDto)
                .then((user) => res.status(201).json(user))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.UserController = UserController;
