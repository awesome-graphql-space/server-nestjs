import { Tweet } from './../../tweets/tweets.entity';
import { IsNotEmpty,IsEmail } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    readonly password: string;
    @IsNotEmpty()
    readonly username: string;
    @IsEmail()
    email: string;
    
  }
 