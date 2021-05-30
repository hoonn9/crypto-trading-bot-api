import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
// import { SellerService } from 'src/modules/seller/seller.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.session.access_token;
    // console.log(req.session);
    if (token) {
      //
      req.user = true;
      // try {
      //   const decoded = this.jwtService.verify(token.toString());
      //   if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
      //     const user = true;
      //     if (user) {
      //       req['user'] = user;
      //     } else {
      //       req['user'] = undefined;
      //     }
      //   } else {
      //     req['user'] = undefined;
      //   }
      // } catch (e) {
      //   console.log(e);
      //   req['user'] = undefined;
      // }
    } else {
      req['user'] = undefined;
    }

    next();
  }
}
