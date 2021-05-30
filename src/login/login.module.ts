import { HttpModule, Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [HttpModule, UsersModule],
  providers: [LoginService, JwtService],
  controllers: [LoginController],
})
export class LoginModule {}
