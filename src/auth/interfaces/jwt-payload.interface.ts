import { User } from './../../modules/users/users.entity';

export interface JwtPayload {
  email: string;
}

export interface JwtAuthPayload {
  token: string;
  user: User;
}
