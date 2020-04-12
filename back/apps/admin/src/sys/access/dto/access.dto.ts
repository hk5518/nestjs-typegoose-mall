/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-06 21:10:51
 */
import { EnumAccessType, EnumDataType } from '@libs/common/enum/std.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, Length } from 'class-validator';

export class AddAccessDto {
    @ApiProperty({description: '资源名称'})
    @IsNotEmpty({message: '资源名称不能为空！'})
    @Length(2, 30, {message: '资源名称长度必须在2-20个字符之间'})
    name: string

    @ApiProperty({description: '资源类型'})
    @IsNotEmpty({message: '资源类型不能为空！'})
    @IsEnum(EnumAccessType, {message: '资源类型不是有效的枚举值！'})
    @Type(() => Number)
    type: number

    @ApiProperty({description: '所属资源'})
    @IsNotEmpty({message: '所属资源不能为空！'})
    pid: any

    @ApiProperty({description: '路由地址'})
    @IsNotEmpty({message: '路由地址不能为空！'})
    url: string

    @ApiProperty({description: '文字图标', required: false})
    icon?: string

    @ApiProperty({description: '排序码', required: false})
    sort?: number

    @ApiProperty({description: '资源描述', required: false})
    description?: string
}

// 更新Dto
export class UpAccessDto {
    @ApiProperty({description: '资源编号'})
    @IsNotEmpty({message: '资源编号不能为空！'})
    _id: string

    @ApiProperty({description: '资源名称'})
    @IsNotEmpty({message: '资源名称不能为空！'})
    @Length(2, 30, {message: '资源名称长度必须在2-20个字符之间'})
    name: string

    @ApiProperty({description: '资源类型'})
    @IsNotEmpty({message: '资源类型不能为空！'})
    @IsEnum(EnumAccessType, {message: '资源类型不是有效的枚举值！'})
    @Type(() => Number)
    type: number

    @ApiProperty({description: '所属资源'})
    @IsNotEmpty({message: '所属资源不能为空！'})
    pid: any

    @ApiProperty({description: '路由地址'})
    @IsNotEmpty({message: '路由地址不能为空！'})
    url: string

    @ApiProperty({description: '文字图标', required: false})
    icon?: string

    @ApiProperty({description: '排序码', required: false})
    sort?: number

    @ApiProperty({description: '资源描述', required: false})
    description?: string
}

// 删除Dto
export class DelAccessDto {
    @ApiProperty({description: '资源编号'})
    @IsNotEmpty({message: '资源编号不能为空！'})
    _id: string
}

// 查询资源Dto
export class FindAccessDto {
    @ApiProperty({description: '数据形式：list | tree', required: false})
    @IsEnum(EnumDataType, {message: '数据形式不是有效的枚举值！'})
    type: string
}