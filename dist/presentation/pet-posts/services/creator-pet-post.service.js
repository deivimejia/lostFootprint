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
exports.CreatorPetPostService = void 0;
const pet_post_model_1 = require("../../../data/postgres/models/pet-post.model");
const domain_1 = require("../../../domain");
class CreatorPetPostService {
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const petPost = new pet_post_model_1.PetPost();
            petPost.petName = userData.petName;
            petPost.description = userData.description;
            petPost.imageUrl = userData.imageUrl;
            try {
                yield petPost.save();
                return {
                    message: 'Pet created succesfully',
                };
            }
            catch (error) {
                this.throwException(error);
            }
        });
    }
    throwException(error) {
        if (error.code === '22P02') {
            throw domain_1.CustomError.unprocessableEntity('Invalid data type');
        }
        throw domain_1.CustomError.internalServerError('Error trying to create user');
    }
}
exports.CreatorPetPostService = CreatorPetPostService;
