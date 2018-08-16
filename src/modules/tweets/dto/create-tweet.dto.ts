
import { IsNotEmpty, IsEmail } from 'class-validator';
/**
 *Sign up user data transfer Object
 *
 * @export
 * @class CreateUserDto
 */
export class CreateTweetDto {
  @IsNotEmpty()
  text: string;
  upload?: string;
  slug: string;
  @IsNotEmpty()
  userId?: number;

}
