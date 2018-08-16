import { jtwSecret } from './../common/utils/index';
import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
@Injectable()
export class AuthService {
  decoded:any={}
  isErrorDecoding:any;
  constructor() {}

  async validateUser(token: string): Promise<any> {

 return  jwt.verify(token, jtwSecret, (err, decoded) =>{
      console.log(decoded) // bar
      if(decoded){
        return true;
      }
      this.decoded=decoded
      if(err){
     
       return false;
      } 
    });

   

     
  }
}