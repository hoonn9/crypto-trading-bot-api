import { HttpModule, Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'src/config/env.validation';

@Module({
  imports: [HttpModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
