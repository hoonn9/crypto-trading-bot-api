import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KakaoLoginResponseDto, KakaoMeResponseDto } from './dtos/kakao.dto';

@Injectable()
export class LoginService {
  private readonly KAKAO_URL = 'https://kauth.kakao.com';
  private readonly KAKAO_API_URL = 'https://kapi.kakao.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async kakaoToken(code: string) {
    return this.httpService
      .post<KakaoLoginResponseDto>(`${this.KAKAO_URL}/oauth/token`, null, {
        params: {
          grant_type: 'authorization_code',
          client_id: this.configService.get<string>('KAKAO_REST_API_KEY'),
          redirect_uri: 'http://localhost:3050/login/kakao/',
          code: code,
        },
        headers: {
          Host: 'kauth.kakao.com',
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .toPromise();
  }

  async kakaoMe(accessToken: string) {
    return this.httpService
      .post<KakaoMeResponseDto>(`${this.KAKAO_API_URL}/v2/user/me`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .toPromise();
  }
}
