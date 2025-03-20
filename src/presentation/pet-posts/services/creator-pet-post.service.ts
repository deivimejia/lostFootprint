import { PetPost } from '../../../data/postgres/models/pet-post.model';
import { CreatePostDto, CustomError } from '../../../domain';

export class CreatorPetPostService {
  async execute(petPostData: CreatePostDto) {
    const petPost = new PetPost();
    petPost.petName = petPostData.petName;
    petPost.description = petPostData.description;
    petPost.imageUrl = petPostData.imageUrl;

    try {
      await petPost.save();
      return {
        message: 'Pet created succesfully',
      };
    } catch (error: any) {
      this.throwException(error);
    }
  }

  private throwException(error: any) {
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid data type');
    }

    throw CustomError.internalServerError('Error trying to create user');
  }
}
