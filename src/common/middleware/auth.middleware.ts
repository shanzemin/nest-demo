import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 获取请求头中的 Authorization
    const authorization = req.headers.authorization
    if (!authorization) {
      throw new HttpException('请求非法', HttpStatus.FORBIDDEN)
    }
    next();
  }
}