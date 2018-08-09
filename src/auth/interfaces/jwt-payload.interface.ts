import { User } from '../../users/interfaces';

export interface JwtPayload {
  email: string;
}

export interface JwtAuthPayload {
  token: string;
  user: User;
}
