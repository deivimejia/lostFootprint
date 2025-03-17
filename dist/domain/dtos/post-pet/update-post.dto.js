"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostDto = void 0;
class UpdatePostDto {
    constructor(description, imageUrl) {
        this.description = description;
        this.imageUrl = imageUrl;
    }
    static execute(object) {
        const { description, imageUrl } = object;
        if (!description)
            return ['description is required'];
        if (!imageUrl)
            return ['image URL is required'];
        return [
            undefined,
            new UpdatePostDto(description.trim().toLowerCase(), imageUrl.trim().toLowerCase()),
        ];
    }
}
exports.UpdatePostDto = UpdatePostDto;
