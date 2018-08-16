import { jtwSecret } from './../utils/index';
import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    //decode jwt and get user role
    let token = request.headers.authorization;
    token = jwt.verify(token.slice(7), jtwSecret, (err, decoded) => {
      console.log(decoded); // bar
      if (decoded) {
        return decoded;
      }

      if (err) {
        /*  throw new HttpException('', HttpStatus.UNAUTHORIZED); */
        return false;
      }
    });

    const user: JwtPayload = { role: token.role, email: token.email };
   
    const hasRole = () => roles.includes(user.role);
    return user && user.role && hasRole();
  }
}
