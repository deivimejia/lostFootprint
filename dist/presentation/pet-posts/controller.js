"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPostsController = void 0;
const create_post_dto_1 = require("../../domain/dtos/post-pet/create-post.dto");
const update_post_dto_1 = require("../../domain/dtos/post-pet/update-post.dto");
const domain_1 = require("../../domain");
class PetPostsController {
    constructor(creatorPetPostService, eliminatorPetPostService, finderPetPostService, finderPetsPostService, updaterPetPostService, aprovePetPostService, rejectPetPostService) {
        this.creatorPetPostService = creatorPetPostService;
        this.eliminatorPetPostService = eliminatorPetPostService;
        this.finderPetPostService = finderPetPostService;
        this.finderPetsPostService = finderPetsPostService;
        this.updaterPetPostService = updaterPetPostService;
        this.aprovePetPostService = aprovePetPostService;
        this.rejectPetPostService = rejectPetPostService;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ message: 'Something went very wrong 🧨' });
        };
        this.register = (req, res) => {
            const [error, createPostDto] = create_post_dto_1.CreatePostDto.execute(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.creatorPetPostService
                .execute(createPostDto)
                .then((message) => res.status(201).json(message))
                .catch((error) => res.status(400));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            this.eliminatorPetPostService
                .execute(id)
                .then(() => res.status(204).json(null))
                .catch((error) => this.handleError(error, res));
        };
        this.findOne = (req, res) => {
            const { id } = req.params;
            this.finderPetPostService
                .execute(id)
                .then((petPost) => res.status(200).json(petPost))
                .catch((error) => this.handleError(error, res));
        };
        this.findAll = (req, res) => {
            this.finderPetsPostService
                .execute()
                .then((petPosts) => res.status(200).json(petPosts))
                .catch((error) => this.handleError(error, res));
        };
        this.patch = (req, res) => {
            const { id } = req.params;
            const [error, updatePostDto] = update_post_dto_1.UpdatePostDto.execute(req.body);
            if (error)
                return res.status(422).json({ message: error });
            this.updaterPetPostService
                .execute(id, updatePostDto)
                .then((petPost) => res.status(200).json(petPost))
                .catch((error) => this.handleError(error, res));
        };
        this.patchApprove = (req, res) => {
            const { id } = req.params;
            this.aprovePetPostService
                .execute(id)
                .then((message) => res.status(200).json(message))
                .catch((error) => this.handleError(error, res));
        };
        this.patchReject = (req, res) => {
            const { id } = req.params;
            this.rejectPetPostService
                .execute(id)
                .then((message) => res.status(200).json(message))
                .catch((error) => this.handleError(error, res));
        };
    }
}
exports.PetPostsController = PetPostsController;
