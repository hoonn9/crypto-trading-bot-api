import { Controller, Get, Query, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from 'src/jwt/jwt.service';
import { SocialType } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { KakaoLoginDto } from './dtos/kakao.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('kakao')
  async kakao(
    @Query() query: KakaoLoginDto,
    @Session() session: any,
    @Res() res: Response,
  ) {
    try {
      const { data } = await this.loginService.kakaoToken(query.code);

      const me = await this.loginService.kakaoMe(data.access_token);
      const kakaoId = String(me.data.id);

      const user = await this.usersService.findOne(kakaoId);

      console.log(user);
      let token: string;

      if (user) {
        token = this.jwtService.sign(user.id);
      } else {
        const newUser = await this.usersService.createOne({
          soicalType: SocialType.KAKAO,
          socialId: kakaoId,
        });
        token = this.jwtService.sign(newUser.id);
      }

      session.jwt_token = token;

      res.redirect('http://localhost:3090/');
    } catch (error) {
      console.log(error);
    }
  }
}
