import { User } from './../users.entity';
export interface UserData {
  userId?: number;
  displayName?: string;
  password?: string;
  email?:string;
  username?: string;
  token?:string;

}
/**
 *User data return object
 *
 * @export
 * @interface UserDataRO
 */
export interface UserDataRO{
  user:UserData
}