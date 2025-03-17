import { PetPost } from '../../../data/postgres/models/pet-post.model';
import { CustomError } from '../../../domain';
import { CreatePostDto } from '../../../domain/dtos/post-pet/create-post.dto';

export class CreatorPetPostService {
  async execute(userData: CreatePostDto) {
    const petPost = new PetPost();
    petPost.petName = userData.petName;
    petPost.description = userData.description;
    petPost.imageUrl = userData.imageUrl;

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
