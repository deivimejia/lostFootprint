"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
class CreatePostDto {
    constructor(petName, description, imageUrl) {
        this.petName = petName;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    static execute(object) {
        const { petName, description, imageUrl } = object;
        if (!petName)
            return ['Pet name is required'];
        if (!description)
            return ['description is required'];
        if (!imageUrl)
            return ['image URL is required '];
        return [
            undefined,
            new CreatePostDto(petName.trim().toLowerCase(), description.trim(), imageUrl.trim().toLowerCase()),
        ];
    }
}
exports.CreatePostDto = CreatePostDto;
