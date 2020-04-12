/*
 * @Descripttion: 授权DTO
 * @version: 1.0
 * @Author: hk55181
 * @Date: 2020-03-04 11:50:58
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
    @ApiProperty({description: '用户名', example: 'admin'})
    @IsNotEmpty({message: '用户名不能为空！'})
    username: string

    @ApiProperty({description: '用户密码', example: '111111'})
    @IsNotEmpty({message: '密码不能为空!'})
    password: string

    @ApiProperty({description: '验证码'})
    @IsNotEmpty({message: '验证码不能为空!'})
    code: string
}