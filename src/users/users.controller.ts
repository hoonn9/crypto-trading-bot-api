import { Controller, Get, Session } from '@nestjs/common';
import session from 'express-session';
import { CurrentUser } from 'src/decorators/user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  @Get()
  async users(@Session() session: any, @CurrentUser() user: User) {
    console.log(session);
    return {
      ok: user,
    };
  }
}
