/*
* @Descripttion: 商品分类DTO
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-16 11:32:12
*/
import { EnumYN } from '@libs/common/enum/std.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, Length } from 'class-validator';

export class QryGoodsCateDto {
    @ApiProperty({description: '搜索关键词', required: false})
    keyword?: string

    @ApiProperty({description: '当前页码'})
    @Type(() => Number)
    @IsInt({message: '页码必须是正整数'})
    page: number

    @ApiProperty({description: '每页条数'})
    @Type(() => Number)
    @IsInt({message: '每页条数必须是正整数'})
    size: number
}

export class AddGoodsCateDto {
    @ApiProperty({description: '分类名称'})
    @IsNotEmpty({message: '分类名称不能为空！'})
    @Length(1, 20, {message: '分类名称长度必须在1-20个字符之间'})
    name: string

    @ApiProperty({description: '分类父编号'})
    @IsNotEmpty({message: '分类父编号不能为空！'})
    pid: any

    @ApiProperty({description: '分类级别'})
    @Type(() => Number)
    @IsInt({message: '分类级别必须是正整数'})
    level: number

    @ApiProperty({description: '分类文字图标', required: false})
    icon?: string
}

export class UpGoodsCateDto {
    @ApiProperty({description: '商品分类编码'})
    @IsNotEmpty({message: '商品分类编码不能为空！'})
    id: string

    @ApiProperty({description: '分类名称'})
    @IsNotEmpty({message: '分类名称不能为空！'})
    @Length(1, 20, {message: '分类名称长度必须在1-20个字符之间'})
    name: string

    @ApiProperty({description: '分类父编号'})
    @IsNotEmpty({message: '分类父编号不能为空！'})
    pid: any

    @ApiProperty({description: '分类级别'})
    @Type(() => Number)
    @IsInt({message: '分类级别必须是正整数'})
    level: number

    @ApiProperty({description: '分类文字图标', required: false})
    icon?: string
}

export class DelGoodsCateDto {
    @ApiProperty({description: '商品分类编码'})
    @IsNotEmpty({message: '商品分类编码不能为空！'})
    id: string
}

export class UpGoodsCateStatusDto {
    @ApiProperty({description: '商品分类编码'})
    @IsNotEmpty({message: '商品分类编码不能为空！'})
    id: string

    @ApiProperty({description: '商品分类状态码'})
    @IsNotEmpty({message: '状态码不能为空！'})
    @Type(() => Number)
    @IsEnum(EnumYN, {message: '状态不是一个有效的枚举值！'})
    status: number
}