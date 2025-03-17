"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetPost = exports.Status = void 0;
const typeorm_1 = require("typeorm");
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["APPROVED"] = "approved";
    Status["REJECTED"] = "rejected";
})(Status || (exports.Status = Status = {}));
let PetPost = class PetPost extends typeorm_1.BaseEntity {
};
exports.PetPost = PetPost;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PetPost.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 30,
        nullable: false,
        default: 'unknown',
    }),
    __metadata("design:type", String)
], PetPost.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], PetPost.prototype, "petName", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        nullable: false,
    }),
    __metadata("design:type", String)
], PetPost.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], PetPost.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: Status,
        default: Status.PENDING,
        nullable: false,
    }),
    __metadata("design:type", String)
], PetPost.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', {
        default: false,
        nullable: false,
    }),
    __metadata("design:type", Boolean)
], PetPost.prototype, "hasfound", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
    }),
    __metadata("design:type", Date)
], PetPost.prototype, "createdAt", void 0);
exports.PetPost = PetPost = __decorate([
    (0, typeorm_1.Entity)()
], PetPost);
