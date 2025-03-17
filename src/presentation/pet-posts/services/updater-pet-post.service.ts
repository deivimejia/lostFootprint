import { PetPost } from '../../../data/postgres/models/pet-post.model';
import { CustomError } from '../../../domain';
import { UpdatePostDto } from '../../../domain/dtos/post-pet/update-post.dto';

export class UpdaterPetPostService {
  async execute(petPostId: string, petPostData: UpdatePostDto) {
    const petPost = await this.ensurePetPostExists(petPostId);

    (petPost.description = petPostData.description),
      (petPost.imageUrl = petPostData.imageUrl);
    try {
      await petPost.save();
      return {
        message: 'Pet post updated succesfully',
      };
    } catch (error) {
      this.throwException(error);
    }
  }

  private async ensurePetPostExists(petPostId: string): Promise<PetPost> {
    const petPost = await PetPost.findOne({
      select: ['id'],
      where: { id: petPostId },
    });

    if (!petPost) {
      throw CustomError.notFound(`PetPost  with id ${petPostId} not found`);
    }

    return petPost;
  }

  private throwException(error: any) {
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid data type');
    }

    throw CustomError.internalServerError('Error trying to create user');
  }
}
