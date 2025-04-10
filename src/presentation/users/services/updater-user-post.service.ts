import { User } from '../../../data/postgres/models/user.model';
import { CustomError, UpdateUserDto } from '../../../domain';

export class UpdaterUserPostService {
  async execute(userId: string, userData: UpdateUserDto) {
    const user = await this.ensureUserExists(userId);

    user.name = userData.name;
    user.email = userData.email;

    try {
      await user.save();
      return {
        message: 'User updated succesfully',
      };
    } catch (error) {
      this.throwException(error);
    }
  }

  private async ensureUserExists(userId: string): Promise<User> {
    const user = await User.findOne({
      select: ['id'],
      where: { id: userId, status: true },
    });

    if (!user) {
      throw CustomError.notFound(`User with id ${userId} not found`);
    }

    return user;
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
