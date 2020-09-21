import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
// hash - usado para verificar senha
import User from '../models/User';
import AppError from '../erros/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    // se nao for criar um metod personalizado , nao precisa criar um repository

    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    const hashedPassword = await hash(password, 8);

    if (checkUserExists) {
      throw new AppError('Email address already used'); // o service sempre retorna um throw nao  um response com status
    }

    const user = usersRepository.create({
      // nao preciso do await pk nao vai criar no bd , apenas uma instancia
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
