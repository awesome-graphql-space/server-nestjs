import { IsNotEmpty,IsEmail } from 'class-validator';
/**
 *Sign up user data transfer Object
 *
 * @export
 * @class CreateUserDto
 */
export class CreateUserDto {
    @IsNotEmpty()
    readonly password: string;
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
    readonly displayName: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }
 