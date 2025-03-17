import { regularExp } from '../../../config';

export class CreatedUserDto {
  constructor(
    public name: string,
    public password: string,
    public email: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreatedUserDto?] {
    const { name, password, email } = object;
    if (!name) return ['name is required'];
    if (!password) return ['password is required'];
    if (!regularExp.password.test(password))
      return [' Format password is invalid'];
    if (!email) return ['email is required '];
    if (!regularExp.email.test(email)) return [' email is invalid'];

    return [
      undefined,
      new CreatedUserDto(
        name.trim().toLowerCase(),
        password.trim(),
        email.trim().toLowerCase()
      ),
    ];
  }
}
