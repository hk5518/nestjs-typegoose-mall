/*
 * @Descripttion: 统一返回正确数据格式拦截器
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-02-22 17:52:02
 */
import { EnumHttpCode } from '@libs/common/enum/std.enum';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface Response<T> {
    data: T
}

@Injectable()
export class ReturnTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((data:any) => {
                return {
                    data,
                    code: EnumHttpCode.SUCCESS,
                    message: '请求成功',
                }
            }
            )
        )
    }
}