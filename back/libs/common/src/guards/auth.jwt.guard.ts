/*
 * @Descripttion: jwt守卫
 * @version: 1.0
 * @Author: hk55181
 * @Date: 2020-02-22 18:10:39
 */
import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Config } from '../config';


@Injectable()
export class AuthJwtGuard extends AuthGuard(['jwt']) {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if (Config.whiteCtrlList.includes(request.path)) {
            return true;
        } else {
            return super.canActivate(context);
        }
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw new HttpException('您没有权限不能访问，请先登录!', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}