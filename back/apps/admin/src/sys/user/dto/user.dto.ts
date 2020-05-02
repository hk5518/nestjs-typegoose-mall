/*
 * @Descripttion: 用户DTO
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-02-22 21:04:46
 */
import { EnumYN } from '@libs/common/enum/std.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsInt, IsMobilePhone, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

// 查询DTO
export class QueryUsersDto {
    @ApiProperty({description: '搜索关键词', required: false})
    keyword?: string

    @ApiProperty({description: '当前页码'})
    @IsNotEmpty({message: '当前页码不能为空！'})
    @Type(() => Number)
    @IsInt({message: '页码必须是正整数'})
    page: number

    @ApiProperty({description: '每页条数'})
    @IsNotEmpty({message: '每页条数不能为空！'})
    @Type(() => Number)
    @IsInt({message: '每页条数必须是正整数'})
    size: number
}

// 添加DTO
export class AddUserDto {
    @ApiProperty({description: '用户名'})
    @IsNotEmpty({message: '用户名不能为空！'})
    @MinLength(3, {message: '用户名长度必须在3-20个字符之间'})
    @MaxLength(20, {message: '用户名长度必须在3-20个字符之间'})
    username: string

    @ApiProperty({description: '用户密码'})
    @IsNotEmpty({message: '密码不能为空！'})
    @MinLength(6, {message: '密码长度必须在6-20个字符之间'})
    @MaxLength(20, {message: '密码长度必须在6-20个字符之间'})
    password: string

    @ApiProperty({description: '用户手机号'})
    @IsNotEmpty({message: '手机号不能为空！'})
    @IsMobilePhone('zh-CN', {strictMode: true}, {message: '手机号格式不正确！'})
    mobile: string

    @ApiProperty({description: '用户邮箱', required: false})
    @IsEmail({allow_display_name: true}, {message: '邮箱格式不正确！'})
    email?: string

    @ApiProperty({description: '角色编码'})
    @IsNotEmpty({message: '角色编号不能为空！'})
    role_id: string
}

// 修改DTO
export class UpUserDto {
    @ApiProperty({description: '用户编码'})
    @IsNotEmpty({message: '用户编号不能为空！'})
    _id: string

    @ApiProperty({description: '用户手机号'})
    @IsNotEmpty({message: '手机号不能为空！'})
    @IsMobilePhone('zh-CN', {strictMode: true}, {message: '手机号格式不正确！'})
    mobile: string

    @ApiProperty({description: '用户邮箱', required: false})
    @IsEmail({allow_display_name: true}, {message: '邮箱格式不正确！'})
    email?: string

    @ApiProperty({description: '角色编码'})
    @IsNotEmpty({message: '角色编号不能为空！'})
    role_id: string
}

// 修改密码DTO
export class upUserPasswordDto {
    @ApiProperty({description: '用户编码'})
    @IsNotEmpty({message: '用户编号不能为空！'})
    _id: string

    @ApiProperty({description: '原密码'})
    @IsNotEmpty({message: '原密码不能为空！'})
    old_password: string

    @ApiProperty({description: '新密码'})
    @IsNotEmpty({message: '新密码不能为空！'})
    new_password: string
}

// 修改状态码DTO
export class upUserStatusDto {
    @ApiProperty({description: '用户编码'})
    @IsNotEmpty({message: '用户编号不能为空！'})
    _id: string

    @ApiProperty({description: '状态码'})
    @IsNotEmpty({message: '状态码不能为空！'})
    @Type(() => Number)
    @IsEnum(EnumYN, {message: '状态码不是一个枚举值！'})
    status: EnumYN
}

// 删除用户DTO
export class DelUserDto {
    @ApiProperty({description: '用户编码'})
    @IsNotEmpty({message: '用户编号不能为空！'})
    _id: string
}