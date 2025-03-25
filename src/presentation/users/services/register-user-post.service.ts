import { EmailService } from '../../../common/services/email.service';
import { encriptAdapter, envs, jwtAdapter } from '../../../config';
import { User } from '../../../data/postgres/models/user.model';
import { CreatedUserDto, CustomError } from '../../../domain';

export class RegisterUserPostService {
  constructor(private readonly emailService: EmailService) {}
  async execute(userData: CreatedUserDto) {
    const user = new User();
    user.name = userData.name;
    user.email = userData.email;
    user.password = this.encriptAdapter(userData.password);

    try {
      await user.save();
      this.sendLinkToForEmailValidateAccount(userData.email);

      return {
        message: 'User created successfully',
      };
    } catch (error: any) {
      this.throwException(error);
    }
  }

  private findOneUserByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user)
      throw CustomError.internalServerError('Email not register in db');
    return user;
  };

  public validateAccount = async (token: string) => {
    const payload = await jwtAdapter.validateToken(token);
    if (!payload) throw CustomError.badRequest('Invalid token');
    const { email } = payload as { email: string };
    if (!email)
      throw CustomError.internalServerError('Email not found in token');
    const user = await this.findOneUserByEmail(email);
    user.status = true;
    try {
      await user.save();
    } catch (error) {
      throw CustomError.internalServerError('Something went very wrong');
    }
  };

  private encriptAdapter(password: string): string {
    return encriptAdapter.hash(password);
  }

  private sendLinkToForEmailValidateAccount = async (email: string) => {
    const token = await jwtAdapter.generateToken({ email }, '300s');
    if (!token) throw CustomError.internalServerError('Error getting token');

    const link = `http://${envs.WEBSERVICE_URL}/api/users/validate-account/${token}`;
    const html = `
       <h1> Validate Your email </h1>
    <p> Click on the following link to validate your email</p>
    <a href='${link}'>Validate your email: ${email}</a>
      `;

    const isSent = this.emailService.sendEmail({
      to: email,
      subject: 'Validate Your Account',
      htmlBody: html,
    });

    if (!isSent) throw CustomError.internalServerError('Error sending email');
    return true;
  };

  private throwException(error: any) {
    if (error.code === '23505') {
      throw CustomError.conflict('Email already in use');
    }
    if (error.code === '22P02') {
      throw CustomError.unprocessableEntity('Invalid data type');
    }

    throw CustomError.internalServerError('Error trying to create user');
  }
}
