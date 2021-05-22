import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  @Get()
  async users(@CurrentUser() user: boolean) {
    return {
      ok: user,
    };
  }
}
