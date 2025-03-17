import { PetPost, Status } from '../../../data/postgres/models/pet-post.model';
import { CustomError } from '../../../domain';

export class RejectPetPostService {
  async execute(petPostId: string) {
    const petPost = await this.ensurePetPostExists(petPostId);
    petPost.status = Status.REJECTED;
    try {
      await petPost.save();
      return {
        message: 'Pet post rejected succesfully',
      };
    } catch (error) {
      throw CustomError.internalServerError('Error trying to reject user');
    }
  }

  private async ensurePetPostExists(petPostId: string): Promise<PetPost> {
    const petPost = await PetPost.findOne({
      select: ['id', 'status'],
      where: { id: petPostId, status: Status.PENDING },
    });
    if (!petPost) {
      throw CustomError.notFound(`Pet Post with id ${petPostId} not found`);
    }

    return petPost;
  }
}
