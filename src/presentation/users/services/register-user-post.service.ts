import { User } from '../../../data/postgres/models/user.model';
import { CreatedUserDto, CustomError } from '../../../domain';

export class RegisterUserPostService {
  async execute(userData: CreatedUserDto) {
    const user = new User();
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    try {
      await user.save();
      return {
        message: 'User created successfully',
      };
    } catch (error: any) {
      this.throwException(error);
    }
  }
  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('Email already in use');
    }
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid data type');
    }

    throw CustomError.internalServerError('Error trying to create user');
  }
}
