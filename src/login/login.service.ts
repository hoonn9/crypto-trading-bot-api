import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  constructor(private httpService: HttpService) {}

  async kakaoToken(code: string) {
    console.log(code);
    return this.httpService.axiosRef('https://kauth.kakao.com/oauth/token', {
      params: {
        grant_type: 'authorization_code',
        client_id: '',
        redirect_uri: 'https://c4ca26e5a424.ngrok.io/login/kakao/',
        code: code,
      },
      headers: {
        Host: 'kauth.kakao.com',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  }
}
