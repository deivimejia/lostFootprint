import { User } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';

export class FinderUserPostService {
  async execute(userId: string) {
    const user = await User.findOne({
      select: ['id', 'name', 'email', 'role'],
      where: { id: userId, status: true },
    });
    if (!user) {
      throw CustomError.notFound(`User with id ${userId} not found`);
    }
    return user;
  }
}
