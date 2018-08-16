import { Tweet } from './../../tweets/tweets.entity';
import { IsNotEmpty ,MinLength} from 'class-validator';
/**
 *Change Pass DTO
 *
 * @export
 * @class ChangeUserPasswordDto
 */
export class ChangeUserPasswordDto {
    @MinLength(10)
    @IsNotEmpty()
    readonly oldPassword: string;
    @IsNotEmpty()
    readonly newPassword: string;
    @IsNotEmpty()
    readonly userId?: string;
  }
 