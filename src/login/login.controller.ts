import { Body, Controller, Get, Query, Req, Request } from '@nestjs/common';
import { KakaoLoginDto } from './dtos/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('kakao')
  async kakao(@Query() query: KakaoLoginDto) {
    try {
      const data = await this.loginService.kakaoToken(query.code);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
