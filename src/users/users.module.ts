import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolvers } from './users.resolver';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
  providers: [UsersService, UsersResolvers],
})
export class UsersModule {}
