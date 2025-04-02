import { PetPost, Status } from '../../../data/postgres/models/pet-post.model';
import { CustomError } from '../../../domain';

export class FinderPetsPostService {
  async execute() {
    try {
      return await PetPost.find({
        select: {
          id: true,
          petName: true,
          description: true,
          imageUrl: true,
          hasfound: true,
          user: {
            id: true,
            name: true,
            email: true,
          },
        },
        where: { status: Status.APPROVED },
        relations: { user: true },
      });
    } catch (error) {
      throw CustomError.internalServerError('Error trying to find pet posts');
    }
  }
}
