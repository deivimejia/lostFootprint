import { envs } from '../../../config';
import { encriptAdapter } from '../../../config/bcrypt.adapter';
import { jwtAdapter } from '../../../config/jwt.adapter';
import { User } from '../../../data/postgres/models/user.model';
import { CustomError, LoginUserDto } from '../../../domain';

export class LoginUserPostService {
  async execute(credentials: LoginUserDto) {
    const user = await this.ensureUserExists(credentials.email);

    this.ensurePasswordIsCorrect(credentials.password, user!.password);

    const token = await this.generateToken(
      { id: user!.id },
      envs.JWT_EXPIRE_IN
    );
    return {
      token,
      user: {
        id: user?.id,
        email: user?.email,
        rol: user?.role,
      },
    };
  }

  private async ensureUserExists(email: string) {
    const user = await User.findOne({
      where: {
        email: email,
        status: true,
      },
    });
    if (!user) {
      throw CustomError.notFound('Invalid credentials');
    }
    return user;
  }
  private ensurePasswordIsCorrect(
    unHashedPassword: string,
    hashedPassword: string
  ) {
    const isMatch = encriptAdapter.compare(unHashedPassword, hashedPassword);
    if (!isMatch) {
      throw CustomError.unAutorized('Invalid credentials');
    }
  }
  private async generateToken(payLoad: any, duration: string) {
    const token = await jwtAdapter.generateToken(payLoad, duration);
    if (!token) {
      throw CustomError.internalServerError('Error while creating JWT');
    }
    return token;
  }
}
