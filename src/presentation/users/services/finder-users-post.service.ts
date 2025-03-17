import { User } from '../../../data/postgres/models/user.model';
import { CustomError } from '../../../domain';

export class FinderUsersPostService {
  async execute() {
    try {
      return await User.find({
        select: ['id', 'name', 'email', 'role'],
        where: { status: true },
      });
    } catch (error) {
      throw CustomError.internalServerError('Error trying to find users');
    }
  }
}
