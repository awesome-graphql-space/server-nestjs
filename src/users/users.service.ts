import { USER_EXCEPTIONS } from './../common/errors/nest-errors';
import { UserException } from './exceptions/user.exceptions';
import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import {  HttpStatus } from "@nestjs/common";
import { HttpException, HttpService } from '@nestjs/common';
import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import * as crypto from "crypto";
import { Repository } from "typeorm";
import { SECRET } from "../config";
import { CreateUserDto } from "./dto/create-user-dto";
import { LoginUserDto } from "./dto/login-user-dto";
import { UserRO } from "./interface/user.interface";
import { User } from "./users.entity";
import { UserExistsException } from "./exceptions/user-exists-exception";
import { UserInvalidDataException } from "./exceptions/user-data-invalid.exceptions";
import { UpdateUserDto } from "./dto/update-user.dto";
const jwt = require("jsonwebtoken");

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public readonly usersRepository: Repository<User>,
    @InjectRepository(Role) public readonly rolesRepository: Repository<Role>,
    private readonly httpService: HttpService
  ) {}

   findSmsAccountDetail(){
    let config={
      auth:{
        username:'hrfifnvr',
        password:'hzchcdkf'
      },
      headers:{'Content-Type': 'application/json'} 

    }
   
   return  this.httpService.get('https://api.smsgh.com/v3/account/profile',config);

  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ["role"] });
  }

  async findOneById(id: number): Promise<User> {
    let foundUser = await this.usersRepository.findOne(id);
    return foundUser;
  }

  async findOneByEmail(data: any): Promise<boolean> {
    if(data==undefined)
    {
      return false;
    }
    let foundUser =  await this.usersRepository.count({ email: data.email })
    if (foundUser>0){
      return true;
    }else{
      return false;
    }
    
  }

  async findOne(loginUserDto: LoginUserDto): Promise<User> {
    const findOneOptions = {
      email: loginUserDto.email,
      password: crypto.createHmac("sha256", loginUserDto.password).digest("hex")
    };

    let userFound = await this.usersRepository.findOne(findOneOptions,{relations: ["role"]});

    if (userFound) {
      return userFound;
    } else {
      throw new UserLoginFailedException();
    }
  }

  

  async create(entry: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { firstName,lastName, email, password, roleId, usersNumber } = entry;

    const userExists = await this.usersRepository.count({ email: entry.email });
    if (userExists > 0) {
      throw new UserExistsException();
    }
    // create new user
    let newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = password;
    newUser.usersNumber = usersNumber;
    
    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new UserInvalidDataException();
    }
    const savedUser = await this.usersRepository.save(newUser);

    const role = await this.rolesRepository.findOne(entry.roleId,{relations: ["users"]});

    if (Array.isArray(role.users)) {
      role.users.push(newUser);
    } else {
      role.users = [newUser];
    }
    const savedRole = await this.rolesRepository.save(role);
    return this.buildUserRO(savedUser, savedRole);
  }

  async findUserById(id: number) {
    let foundUser = await this.usersRepository.findOne(id);
    if (foundUser == undefined) {
      throw new UserExistsException();
    }
    return foundUser;
  }

  async updateOne(dto: UpdateUserDto): Promise<User> {
    let toUpdate = await this.usersRepository.findOne(dto.userId);
    if (toUpdate == undefined) {
      throw new UserExistsException();
    }
    //delete toUpdate.password;

    let updated = Object.assign(toUpdate, dto);

    if (dto.roleId != undefined) {
      let role = await this.rolesRepository.findOne(dto.roleId);
      if (Array.isArray(role.users)) {
        role.users = role.users.filter(item => item.userId !== dto.userId);
        role.users.push(updated);
      } else {
        role.users = [updated];
      }

      await this.rolesRepository.save(role);
    }
    return await this.usersRepository.save(updated);
  }

  async deleteOne(userId: number) {
    let toDelete = await this.usersRepository.findOne(userId);
    if (toDelete == undefined) {
      throw new UserNotExistsException();
    }
    await this.usersRepository.delete({ userId: userId });
    return toDelete;
  }

  public generateJWT(data,role) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
   let expSeconds = exp.getTime() / 1000

    console.log(exp,'the date');

  
      const user: JwtPayload = { email: data.email,role:role };
      return jwt.sign(user, SECRET, { expiresIn: 3600000 });
    

    /* return jwt.sign(
      {
        id: user.userId,
        name: user.name,
        email: user.email,
        userId: user.userId,
        role: user.role,
        usersNumber:user.usersNumber,
        exp: exp.getTime() / 1000
      },
      SECRET
    ); */
  }

  private buildUserRO(user: User, savedRole?: any) {
    const userRO = {
      firstName: user.firstName,
      lastName:user.lastName,
      email: user.email,
      userId: user.userId,
      usersNumber:user.usersNumber,
      token: this.generateJWT(user,savedRole),
      role: savedRole
    };

    return { user: userRO };
  }

  private  buildSmsAccountDataRo(smsData:SmsAccountData){
    const smsDataRO = {
    AccountId: smsData.AccountId,
    AccountNumber: smsData.AccountNumber,
    Company:smsData.Company,
    PrimaryContact :smsData.PrimaryContact,
    MobileNumber :smsData.MobileNumber,
    EmailAddress :smsData.EmailAddress,
    Balance :smsData.Balance,
    Credit :smsData.Credit,
    }
    return  {smsData:smsDataRO}

  }

  /* async findEntriesByCategory(categoryId: string): Promise<users[]> {
    try {
      return await this.usersRepository.find({ categoryId });
    } catch (err) {
      return err;
    }
  }

  async findEntriesByAuthor(authorId: string): Promise<Entry[]> {
    try {
      return await this.usersRepository.find({ authorId });
    } catch (err) {
      return err;
    }
  } */
}
