import { User } from './../users.entity';
export interface UserData {
  userId?: string;
  displayName?: string;
  password?: string;
  email?:string;
  username?: string;
  token:string;
  user:User
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