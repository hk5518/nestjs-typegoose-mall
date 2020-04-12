/*
 * @Descripttion: 统一异常码
 * @version: 1.0
 * @Author: hk55181
 * @Date: 2020-02-22 18:10:01
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
    constructor(data: string) {
        super(data, HttpStatus.OK);
    }
}