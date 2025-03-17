"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdaterUserPostService = void 0;
const user_model_1 = require("../../../data/postgres/models/user.model");
const domain_1 = require("../../../domain");
class UpdaterUserPostService {
    execute(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ensureUserExists(userId);
            user.name = userData.name;
            user.email = userData.email;
            try {
                yield user.save();
                return {
                    message: 'User updated succesfully',
                };
            }
            catch (error) {
                this.throwException(error);
            }
        });
    }
    ensureUserExists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({
                select: ['id'],
                where: { id: userId, status: true },
            });
            if (!user) {
                throw domain_1.CustomError.notFound(`User with id ${userId} not found`);
            }
            return user;
        });
    }
    throwException(error) {
        if (error.code === '23505') {
            throw domain_1.CustomError.conflict('Email already in use');
        }
        if (error.code === '22P02') {
            throw domain_1.CustomError.unprocessableEntity('Invalid data type');
        }
        throw domain_1.CustomError.internalServerError('Error trying to create user');
    }
}
exports.UpdaterUserPostService = UpdaterUserPostService;
