import { PetPost } from '../../../data/postgres/models/pet-post.model';

import { CreatePostDto, CustomError } from '../../../domain';
import { FinderUserPostService } from '../../users/services';

export class CreatorPetPostService {
  constructor(private readonly findUserService: FinderUserPostService) {}

  async execute(petPostData: CreatePostDto, userId: string) {
    const petPost = new PetPost();

    const user = await this.findUserService.execute(userId);
    petPost.petName = petPostData.petName;
    petPost.description = petPostData.description;
    petPost.imageUrl = petPostData.imageUrl;
    petPost.user = user;

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
