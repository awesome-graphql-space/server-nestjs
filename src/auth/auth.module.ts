import { UsersModule } from './../modules/users/users.module';
import { HttpStrategy  } from './http.strategy'; 
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
@Module({
  imports: [UsersModule],
  providers: [AuthService,HttpStrategy ],
  exports:[AuthService]
})
export class AuthModule {}
