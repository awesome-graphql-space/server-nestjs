import { UserDataRO } from './interfaces/user.interface';
import { UserExceptions } from './exceptions/user.exceptions';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { jtwSecret } from './../../common/utils/index';
import { USER_EXCEPTIONS } from './../../common/errors/nest-errors';
import { HttpStatus } from '@nestjs/common';
import { HttpException, HttpService } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, Validator } from 'class-validator';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');
/**
 *
 *
 * @export
 * @class UsersService
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public readonly usersRepository: Repository<User>
  ) {}

  /**
   *Load all users with their tweets
   *
   * @returns {Promise<User[]>}
   * @memberof UsersService
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['tweets'] });
  }
  /**
   *Find one user by Id
   *
   * @param {number} id
   * @returns {Promise<User>}
   * @memberof UsersService
   */
  async findOneById(id: number): Promise<User> {
    let foundUser = await this.usersRepository.findOne(id);
    return foundUser;
  }
  /**
   *Find one user by email ..can be used to check email is unique
   *
   * @param {*} data
   * @returns {Promise<boolean>}
   * @memberof UsersService
   */
  async findOneByEmail(data: any): Promise<boolean> {
    if (data == undefined) {
      return false;
    }
    let foundUser = await this.usersRepository.count({ email: data.email });
    if (foundUser > 0) {
      return true;
    } else {
      return false;
    }
  }
/**
 *
 *
 * @param {LoginUserDto} loginUserDto
 * @returns {Promise<User>}
 * @memberof UsersService
 */
async loginUser(loginUserDto: LoginUserDto): Promise<UserDataRO> {
    const findOneOptions = {
      username: loginUserDto.username,
    };

    let userFound = await this.usersRepository.findOne(findOneOptions, {
      relations: ['tweets'],
    });
    if (!userFound) {
      throw new UserExceptions(USER_EXCEPTIONS.UserNotFoundError);
    }
    const valid = await bcrypt.compare(
      loginUserDto.password,
      userFound.password,
    );
    if (!valid) {
      throw new UserExceptions(USER_EXCEPTIONS.WrongPassword);
    }

    return await this.buildUserRO(userFound);
  }

  async generateToken(user: User) {
    return await jwt.sign({ userId: user.userId }, jtwSecret);
  }
/**
 *
 *
 * @param {CreateUserDto} entry
 * @returns {Promise<UserDataRO>}
 * @memberof UsersService
 */
async signUp(entry: CreateUserDto): Promise<UserDataRO> {

    const userExists = await this.usersRepository.count({
      username: entry.username,
    });
    if (userExists > 0) {
      throw new UserExceptions(USER_EXCEPTIONS.UserUsernameExistsError);
    }
    // create new user
    let newUser = new User();
    // You could do the below commented but for simplicity i use object.assign
    /* newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = password;
    newUser.usersNumber = usersNumber; */

    let updated = Object.assign(newUser, entry);

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new UserExceptions(errors);
    }
    const savedUser = await this.usersRepository.save(newUser);

    return this.buildUserRO(savedUser);
  }

  async getHashedPassword(value: string) {
    return bcrypt.hash(value, 10);
  }

  /**
   *
   *
   * @param {ChangeUserPasswordDto} dto
   * @returns {Promise<User>}
   * @memberof UsersService
   */
  async changePassword(dto: ChangeUserPasswordDto): Promise<User> {
    let { oldPassword, newPassword, userId } = dto;

    let toUpdate = await this.usersRepository.findOne(userId);
    if (toUpdate == undefined) {
      throw new UserExceptions(USER_EXCEPTIONS.UserNotFoundError);
    }
    //check pass length
    const validator = new Validator();
    if (validator.minLength(newPassword, 10)) {
      throw new UserExceptions(USER_EXCEPTIONS.PasswordTooShortError);
    }
    const valid = await bcrypt.compare(toUpdate.password, oldPassword);
    if (!valid) {
      throw new UserExceptions(USER_EXCEPTIONS.InvalidOldPasswordError);
    }
    let newUserPasswordChange = new User();
    newUserPasswordChange.password = await this.getHashedPassword(newPassword);
    
    return await this.usersRepository.save(newUserPasswordChange);
  }
/**
 *
 *
 * @param {number} userId
 * @returns
 * @memberof UsersService
 */
async deleteOne(userId: number) {
    let toDelete = await this.usersRepository.findOne(userId);
    if (toDelete == undefined) {
      throw new UserExceptions(USER_EXCEPTIONS.UserDeletedError);
    }
    await this.usersRepository.delete({ userId: userId });
    return toDelete;
  }
/**
 *
 *
 * @private
 * @param {User} user
 * @returns
 * @memberof UsersService
 */
private async buildUserRO(user: User) {
    const userRO = {
      user: user,
      token: await this.generateToken(user),
    };

    return { user: userRO };
  }
}
