import { PetPost, Status } from '../../../data/postgres/models/pet-post.model';
import { CustomError } from '../../../domain';

export class EliminatorPetPostService {
  async execute(petPostId: string) {
    const petPost = await this.ensurePetPostExists(petPostId);
    petPost.remove();
    try {
    } catch (error) {
      throw CustomError.internalServerError('Error trying to delete user');
    }
  }

  private async ensurePetPostExists(petPostId: string): Promise<PetPost> {
    const petPost = await PetPost.findOne({
      select: ['id'],
      where: { id: petPostId },
    });
    if (!petPost) {
      throw CustomError.notFound(`Pet Post with id ${petPostId} not found`);
    }

    return petPost;
  }
}
