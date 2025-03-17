"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedUserDto = void 0;
const config_1 = require("../../../config");
class CreatedUserDto {
    constructor(name, password, email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
    static execute(object) {
        const { name, password, email } = object;
        if (!name)
            return ['name is required'];
        if (!password)
            return ['password is required'];
        if (!config_1.regularExp.password.test(password))
            return [' Format password is invalid'];
        if (!email)
            return ['email is required '];
        if (!config_1.regularExp.email.test(email))
            return [' email is invalid'];
        return [
            undefined,
            new CreatedUserDto(name.trim().toLowerCase(), password.trim(), email.trim().toLowerCase()),
        ];
    }
}
exports.CreatedUserDto = CreatedUserDto;
