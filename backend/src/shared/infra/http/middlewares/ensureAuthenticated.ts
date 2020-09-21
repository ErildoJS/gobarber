import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'; // verifica se o token é  valido
import authConfig from '../config/auth';
import AppError from '../erros/AppError';

interface TokenPaylod {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    // console.log(decoded);
    const { sub } = decoded as TokenPaylod;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
