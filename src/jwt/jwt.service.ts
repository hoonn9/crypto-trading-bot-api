import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { SocialType } from 'src/users/dtos/user.dto';
import { JwtVerifyResult } from './jwt.types';

@Injectable()
export class JwtService {
  private readonly JWT_TOKEN: string;

  constructor(private readonly configService: ConfigService) {
    const jwtToken = configService.get<string>('JWT_TOKEN');

    if (!jwtToken) {
      throw new Error('jwt token is missing.');
    }

    this.JWT_TOKEN = jwtToken;
  }

  sign(userId: number) {
    return jwt.sign(
      {
        userId,
      },
      this.JWT_TOKEN,
    );
  }

  verify(token: string) {
    const result = jwt.verify(token, this.JWT_TOKEN);

    return result as string | JwtVerifyResult;
  }
}
