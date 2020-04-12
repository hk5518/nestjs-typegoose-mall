/*
 * @Descripttion: DTO数据校验管道转换器
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-02-22 17:26:05
 */
import { ArgumentMetadata, HttpException, HttpStatus, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as _ from 'lodash';


@Injectable()
export class ErrorValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        Logger.log(errors);
        if (errors.length > 0) {
            // 遍历所有错误信息返回前端
            const errorMessage = errors.map(item => {
                return {
                    val: item.value,
                    prop: _.values(item.constraints)[0],
                    // [item.property]: _.values(item.constraints)[0],
                };
            });
            throw new HttpException(errorMessage[0].prop, HttpStatus.OK);
        }
        return value;
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}