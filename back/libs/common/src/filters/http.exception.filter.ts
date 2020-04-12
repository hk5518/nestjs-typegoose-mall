/*
import { EnumHttpCode } from './../enum/std.enum';
 * @Descripttion: HTTP异常过滤返回格式统一处理
 * @version: 1.0
 * @Author: hk55181
 * @Date: 2020-02-22 17:45:58
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { EnumHttpCode } from '../enum/std.enum';



@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any = exception.message || null;
        message = _.isString(message) ? message || '请求失败' : JSON.stringify(message);
        Logger.warn(`${request.url} 异常信息：${JSON.stringify(exception)}`);

        let code = EnumHttpCode.FAIL;
        if (status === 200) {
            code = EnumHttpCode.FAIL
        } else if (status === 401) {
            code = EnumHttpCode.NO_LOGIN;
        } else if(status >= 500) {
            code = EnumHttpCode.EXCEPTION;
        }
        response
        .status(status)
        .json({
            code,
            message,
            status,
            method: request.method,
            path: request.url,
            timestamp: new Date().toLocaleTimeString()
        })
    }
}