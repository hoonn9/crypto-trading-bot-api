import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { JwtVerifyResult } from './jwt.interfaces';

@Injectable()
export class JwtService {
  private JWT_TOKEN: string;
  constructor(private configService: ConfigService) {
    const jwtToken = this.configService.get<string>('JWT_TOKEN');
    if (!jwtToken) {
      throw Error('jwt token missing.');
    }
    this.JWT_TOKEN = jwtToken;
  }
  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.JWT_TOKEN);
  }
  verify(token: string): JwtVerifyResult | string {
    const result = jwt.verify(token, this.JWT_TOKEN);
    if (typeof result === 'string') {
      return result;
    }
    return result as JwtVerifyResult;
  }
}
