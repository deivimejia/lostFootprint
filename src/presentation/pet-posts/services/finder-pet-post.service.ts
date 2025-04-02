import { PetPost, Status } from '../../../data/postgres/models/pet-post.model';
import { CustomError } from '../../../domain';

export class FinderPetPostService {
  async execute(petPostId: string) {
    const petPost = await PetPost.findOne({
      where: { id: petPostId, status: Status.APPROVED },
      relations: {
        user: true,
      },
      select: {
        id: true,
        petName: true,
        description: true,
        imageUrl: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
    if (!petPost) {
      throw CustomError.notFound(`Pet post with id ${petPostId} not found`);
    }
    return petPost;
  }
}
