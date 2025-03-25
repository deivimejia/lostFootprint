import { PetPost, Status } from '../../../data/postgres/models/pet-post.model';
import { CustomError } from '../../../domain';

export class FinderPetsPostService {
  async execute() {
    try {
      return await PetPost.find({
        select: [
          'id',
          'petName',
          'userId',
          'description',
          'imageUrl',
          'hasfound',
        ],
        where: { status: Status.APPROVED },
      });
    } catch (error) {
      throw CustomError.internalServerError('Error trying to find pet posts');
    }
  }
}
