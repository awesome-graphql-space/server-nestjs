import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { AuthGuard } from "@nestjs/passport";
import { LoginUserDto } from "./dto/login-user-dto";
import { CreateUserDto } from "./dto/create-user-dto";
import { Component, UseGuards } from "@nestjs/common";
import {
  Query,
  Mutation,
  Resolver,
  DelegateProperty,
  Subscription
} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { HttpException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { error } from "util";
import { map } from "rxjs/operators";
const pubsub = new PubSub();

@Resolver("users")
export class UsersResolvers {
  smsDataRes: any;
  constructor(private readonly usersService: UsersService) {}

  @Query("allUsers")
  @UseGuards(AuthGuard('bearer'))
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Query("user")
  @UseGuards(AuthGuard('bearer'))
  async findOneById(obj, args, context, info): Promise<User> {
    const { userId } = args;
    return await this.usersService.findOneById(+userId);
  }
  

  @Mutation("signUpUser")
  async create(obj, args: CreateUserDto, context, info) {
    const signedUser = await this.usersService.signUp(args);
    pubsub.publish("userCreated", { userCreated: signedUser.user });
    return signedUser.user;
  }

  @Mutation("loginUser")
  async login(obj, args: LoginUserDto, context, info) {
    const _user = await this.usersService.loginUser(args);
    return _user;
  }

  @Mutation("changeUserPass")
  @UseGuards(AuthGuard('bearer'))
  async update(obj, args: ChangeUserPasswordDto, context, info) {
    const userPassChanged = await this.usersService.changePassword(args);
    pubsub.publish("userUpdated", { userUpdated: userPassChanged });
    return userPassChanged;
  }

  @Mutation("deleteUser")
  @UseGuards(AuthGuard('bearer'))
  async delete(obj, args, context, info): Promise<User> {
    const { userId } = args;
    const deletedUser = await this.usersService.deleteOne(+userId);
    pubsub.publish("userDeleted", { userDeleted: deletedUser });
    return deletedUser;
  }

  @Subscription("userCreated")
  userCreated() {
    return {
      subscribe: () => pubsub.asyncIterator("userCreated")
    };
  }

  @Subscription("userDeleted")
  userDeleted() {
    return {
      subscribe: () => pubsub.asyncIterator("userDeleted")
    };
  }

  @Subscription("userUpdated")
  userUpdated() {
    return {
      subscribe: () => pubsub.asyncIterator("userUpdated")
    };
  }
}
