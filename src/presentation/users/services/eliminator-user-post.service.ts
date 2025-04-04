import { User } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';

export class EliminatorUserPostService {
  async execute(userId: string) {
    const user = await this.ensureUserExists(userId);
    user.status = false;

    try {
      await user.save();
    } catch (error) {
      throw CustomError.internalServerError('Error trying to delete user');
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
}
