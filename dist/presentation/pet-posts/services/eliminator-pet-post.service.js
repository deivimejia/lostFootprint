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
exports.EliminatorPetPostService = void 0;
const pet_post_model_1 = require("../../../data/postgres/models/pet-post.model");
const domain_1 = require("../../../domain");
class EliminatorPetPostService {
    execute(petPostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield this.ensurePetPostExists(petPostId);
            petPost.remove();
            try {
            }
            catch (error) {
                throw domain_1.CustomError.internalServerError('Error trying to delete user');
            }
        });
    }
    ensurePetPostExists(petPostId) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = yield pet_post_model_1.PetPost.findOne({
                select: ['id'],
                where: { id: petPostId },
            });
            if (!petPost) {
                throw domain_1.CustomError.notFound(`Pet Post with id ${petPostId} not found`);
            }
            return petPost;
        });
    }
}
exports.EliminatorPetPostService = EliminatorPetPostService;
