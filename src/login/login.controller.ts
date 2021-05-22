import { Controller, Get, Query, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { KakaoLoginDto } from './dtos/kakao.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('kakao')
  async kakao(
    @Query() query: KakaoLoginDto,
    @Session() session: any,
    @Res() res: Response,
  ) {
    try {
      console.log('session', session);
      const { data } = await this.loginService.kakaoToken(query.code);

      const me = await this.loginService.kakaoMe(data.access_token);
      /**
       * @TODO user id 존재하는지 체크하고 없으면 계정 만들어주기
       */
      console.log(me.data.id);

      session.access_token = data.access_token;
      session.refresh_token = data.refresh_token;
      res.redirect('http://localhost:3090/');
    } catch (error) {
      console.log(error);
    }
  }
}
