import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs'; // compare - usado para comparar  senhas
import { sign } from 'jsonwebtoken'; // cria um token
import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../erros/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticaUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id, // id do user que gerou esse token
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticaUserService;
