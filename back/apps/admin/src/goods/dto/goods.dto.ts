/*
* @Descripttion:
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-26 16:01:37
*/
import { EnumGoodsStatus } from '@libs/common/enum/std.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class QryGoodsDto {
    @ApiProperty({description: '搜索关键词', required: false})
    keyword?: string

    @ApiProperty({description: '当前页码'})
    @IsNotEmpty({message: '当前页码不能为空！'})
    @IsInt({message: '当前页码必须是一个整数！'})
    @Type(() => Number)
    page: number

    @ApiProperty({description: '每页条数'})
    @IsNotEmpty({message: '每页条数不能为空！'})
    @IsInt({message: '每页条数必须是一个整数！'})
    @Type(() => Number)
    size: number
}

export class LoadGoodsBySnDto {
    @ApiProperty({description: '商品唯一码'})
    @IsNotEmpty({message: '商品唯一码不能为空！'})
    sn: string
}

export class AddGoodsDto {
    @ApiProperty({description: '商品名称'})
    @IsNotEmpty({message: '商品名称不能为空！'})
    name: string

    @ApiProperty({description: '商品价格'})
    @IsNotEmpty({message: '商品价格不能为空！'})
    @IsNumber({allowNaN: false}, {message: '商品价格必须是一个数字！'})
    @Type(() => Number)
    price: number

    @ApiProperty({description: '商品重量'})
    @IsNotEmpty({message: '商品重量不能为空！'})
    @IsNumber({allowNaN: false}, {message: '商品重量必须是一个数字！'})
    @Type(() => Number)
    weight: number

    @ApiProperty({description: '商品数量'})
    @IsNotEmpty({message: '商品数量不能为空！'})
    @IsInt({message: '商品数量必须是一个整数！'})
    @Type(() => Number)
    amount: number

    @ApiProperty({description: '是否开启销售属性'})
    @IsNotEmpty({message: '是否开启销售属性不能为空！'})
    @IsInt({message: '是否开启销售属性必须是一个整数！'})
    @Type(() => Number)
    is_sale: number

    @ApiProperty({description: '分类编码数组'})
    @IsNotEmpty({message: '分类编码数组不能为空！'})
    @IsArray({message: '分类编码数组不是一个数组'})
    goods_cate: string[]

    @ApiProperty({description: '品牌编号'})
    @IsNotEmpty({message: '品牌编号不能为空！'})
    goods_brand_id: string

    @ApiProperty({description: '销售属性'})
    @IsNotEmpty({message: '销售属性不能为空！'})
    @IsArray({message: '销售属性不是一个数组'})
    sale_attr: any[]

    @ApiProperty({description: '包装规格属性'})
    @IsNotEmpty({message: '包装规格属性不能为空！'})
    @IsArray({message: '销包装规格属性不是一个数组'})
    basic_attr: any[]

    @ApiProperty({description: '商品sku'})
    @IsNotEmpty({message: '商品sku不能为空！'})
    @IsArray({message: '商品sku不是一个数组'})
    goods_sku: any[]

    @ApiProperty({description: '商品概述'})
    sub_name?: string

    @ApiProperty({description: '商品详情'})
    content?: string

    @ApiProperty({description: '商品图片'})
    pic?: string[]
}

export class UpGoodsDto extends AddGoodsDto {
    @ApiProperty({description: '商品唯一码'})
    @IsNotEmpty({message: '商品唯一码不能为空！'})
    sn: string
}

export class UpGoodsStatusDto {
    @ApiProperty({description: '商品唯一码'})
    @IsNotEmpty({message: '商品唯一码不能为空！'})
    sn: string

    @ApiProperty({description: '商品状态'})
    @IsNotEmpty({message: '商品状态不能为空！'})
    @IsInt({message: '商品状态必须是一个整数！'})
    @Type(() => Number)
    @IsEnum(EnumGoodsStatus, {message: '商品状态不是一个有效的枚举值!'})
    status: EnumGoodsStatus
}

export class UpGoodsIsHotDto {
    @ApiProperty({description: '商品唯一码'})
    @IsNotEmpty({message: '商品唯一码不能为空！'})
    sn: string

    @ApiProperty({description: '商品是否热销'})
    @IsNotEmpty({message: '商品是否热销不能为空！'})
    @IsInt({message: '商品是否热销必须是一个整数！'})
    @Type(() => Number)
    is_hot: number
}

export class UpGoodsIsBestDto {
    @ApiProperty({description: '商品唯一码'})
    @IsNotEmpty({message: '商品唯一码不能为空！'})
    sn: string

    @ApiProperty({description: '商品是否精品'})
    @IsNotEmpty({message: '商品是否精品不能为空！'})
    @IsInt({message: '商品是否精品必须是一个整数！'})
    @Type(() => Number)
    is_best: number
}

export class UpGoodsIsNewDto {
    @ApiProperty({description: '商品唯一码'})
    @IsNotEmpty({message: '商品唯一码不能为空！'})
    sn: string

    @ApiProperty({description: '商品是否新品'})
    @IsNotEmpty({message: '商品是否新品不能为空！'})
    @IsInt({message: '商品是否新品必须是一个整数！'})
    @Type(() => Number)
    is_new: number
}