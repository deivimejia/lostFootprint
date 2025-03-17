"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const config_1 = require("../../../config");
class UpdateUserDto {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    static execute(object) {
        const { name, email } = object;
        if (!name)
            return ['name is required'];
        if (!email)
            return ['email is required'];
        if (!config_1.regularExp.email.test(email))
            return ['Email is invalid'];
        return [
            undefined,
            new UpdateUserDto(name.trim().toLowerCase(), email.trim().toLowerCase()),
        ];
    }
}
exports.UpdateUserDto = UpdateUserDto;
