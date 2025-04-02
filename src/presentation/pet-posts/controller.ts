import { Request, Response } from 'express';
import {
  ApprovedPetPostService,
  CreatorPetPostService,
  EliminatorPetPostService,
  FinderPetPostService,
  FinderPetsPostService,
  RejectPetPostService,
  UpdaterPetPostService,
} from './services';
import { CreatePostDto } from '../../domain/dtos/post-pet/create-post.dto';
import { UpdatePostDto } from '../../domain/dtos/post-pet/update-post.dto';
import { CustomError } from '../../domain';

export class PetPostsController {
  constructor(
    private readonly creatorPetPostService: CreatorPetPostService,
    private readonly eliminatorPetPostService: EliminatorPetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly finderPetsPostService: FinderPetsPostService,
    private readonly updaterPetPostService: UpdaterPetPostService,
    private readonly aprovePetPostService: ApprovedPetPostService,
    private readonly rejectPetPostService: RejectPetPostService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Something went very wrong 🧨' });
  };

  register = (req: Request, res: Response) => {
    const [error, createPostDto] = CreatePostDto.execute(req.body);
    const userId = req.body.sessionUser.id;
    if (error) return res.status(422).json({ message: error });
    this.creatorPetPostService
      .execute(createPostDto!, userId)
      .then((message) => res.status(201).json(message))
      .catch((error) => res.status(400));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.eliminatorPetPostService
      .execute(id)
      .then(() => res.status(204).json(null))
      .catch((error) => this.handleError(error, res));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;
    this.finderPetPostService
      .execute(id)
      .then((petPost) => res.status(200).json(petPost))
      .catch((error) => this.handleError(error, res));
  };
  findAll = (req: Request, res: Response) => {
    this.finderPetsPostService
      .execute()
      .then((petPosts) => res.status(200).json(petPosts))
      .catch((error) => this.handleError(error, res));
  };
  patch = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updatePostDto] = UpdatePostDto.execute(req.body);
    if (error) return res.status(422).json({ message: error });
    this.updaterPetPostService
      .execute(id, updatePostDto!)
      .then((petPost) => res.status(200).json(petPost))
      .catch((error) => this.handleError(error, res));
  };

  patchApprove = (req: Request, res: Response) => {
    const { id } = req.params;
    this.aprovePetPostService
      .execute(id)
      .then((message) => res.status(200).json(message))
      .catch((error) => this.handleError(error, res));
  };
  patchReject = (req: Request, res: Response) => {
    const { id } = req.params;
    this.rejectPetPostService
      .execute(id)
      .then((message) => res.status(200).json(message))
      .catch((error) => this.handleError(error, res));
  };
}
