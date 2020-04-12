/*
* @Descripttion: 商品类型属性DTO
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-13 17:25:16
*/
import { EnumAttrType } from '@libs/common/enum/std.enum'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator'

export class AddGoodsAttrDto {
    @ApiProperty({description: '商品属性名称'})
    @IsNotEmpty({message: '商品属性名称不能为空！'})
    name: string

    @ApiProperty({description: '属性类型'})
    @IsNotEmpty({message: '属性类型不能为空！'})
    @Type(() => Number)
    @IsEnum(EnumAttrType, {message: '属性类型不是一个有效的枚举值'})
    type: number

    @ApiProperty({description: '商品分类编码'})
    @IsNotEmpty({message: '商品分类编码不能为空！'})
    goods_cate_id: string
}

export class UpGoodsAttrDto {
    @ApiProperty({description: '商品属性编号'})
    @IsNotEmpty({message: '商品属性编号不能为空！'})
    id: string

    @ApiProperty({description: '商品属性名称'})
    @IsNotEmpty({message: '商品属性名称不能为空！'})
    name: string

    @ApiProperty({description: '商品属性英文名称', required: false})
    enlish_name?: string

    @ApiProperty({description: '属性类型'})
    @IsNotEmpty({message: '属性类型不能为空！'})
    @Type(() => Number)
    @IsEnum(EnumAttrType, {message: '属性类型不是一个有效的枚举值'})
    type: number

    @ApiProperty({description: '商品属性编码'})
    @IsNotEmpty({message: '商品属性编码不能为空！'})
    goods_cate_id: string
}

export class DelGoodsAttrDto {
    @ApiProperty({description: '商品属性编码'})
    @IsNotEmpty({message: '商品属性编码不能为空！'})
    id: string
}

export class UpGoodsAttrValDto {
    @ApiProperty({description: '商品属性编码'})
    @IsNotEmpty({message: '商品属性编码不能为空！'})
    id: string

    @ApiProperty({description: '商品属性值'})
    @IsNotEmpty({message: '商品属性值不能为空！'})
    @IsArray({message: '商品属性值不是一个有效的数组！'})
    attr_vals: any[]
}