import { Request, Response } from 'express';
import { CreatedUserDto, CustomError, UpdateUserDto } from '../../domain';
import {
  EliminatorUserPostService,
  FinderUserPostService,
  FinderUsersPostService,
  LoginUserPostService,
  RegisterUserPostService,
  UpdaterUserPostService,
} from './services';

export class UserController {
  constructor(
    private readonly eliminatorUserService: EliminatorUserPostService,
    private readonly finderUserService: FinderUserPostService,
    private readonly finderUsersService: FinderUsersPostService,
    private readonly loginUserService: LoginUserPostService,
    private readonly registerUserService: RegisterUserPostService,
    private readonly updaterUserService: UpdaterUserPostService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Something went very wrong 🧨' });
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.eliminatorUserService
      .execute(id)
      .then(() => res.status(204).json(null))
      .catch((error) => this.handleError(error, res));
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;
    this.finderUserService
      .execute(id)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res));
  };

  findAll = (req: Request, res: Response) => {
    this.finderUsersService
      .execute()
      .then((users) => res.status(200).json(users))
      .catch((error) => this.handleError(error, res));
  };

  login = (req: Request, res: Response) => {
    this.loginUserService
      .execute()
      .then((message) => res.status(501).json(message))
      .catch((error) => res.status(400));
  };
  register = (req: Request, res: Response) => {
    const [error, createdUserDto] = CreatedUserDto.execute(req.body);
    if (error) return res.status(422).json({ message: error });
    this.registerUserService
      .execute(createdUserDto!)
      .then((message) => res.status(201).json(message))
      .catch((error) => this.handleError(error, res));
  };

  updater = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updaterUserDto] = UpdateUserDto.execute(req.body);
    if (error) return res.status(422).json({ message: error });
    this.updaterUserService
      .execute(id, updaterUserDto!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  };
}
