import { PetPost, Status } from '../../../data/postgres/models/pet-post.model';
import { CustomError } from '../../../domain';

export class FinderPetPostService {
  async execute(petPostId: string) {
    const petPost = await PetPost.findOne({
      select: ['petName', 'description', 'imageUrl'],
      where: { id: petPostId, status: Status.APPROVED },
    });
    if (!petPost) {
      throw CustomError.notFound(`Pet post with id ${petPostId} not found`);
    }
    return petPost;
  }
}
