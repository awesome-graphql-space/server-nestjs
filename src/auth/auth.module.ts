import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolvers } from './auth.resolvers';

@Module({
  providers: [AuthService, AuthResolvers],
})
export class AuthModule {}
