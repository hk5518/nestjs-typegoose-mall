/*
* @Descripttion: 商品品牌模型
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-13 10:39:56
*/
import { EnumYN } from '@libs/common/enum/std.enum';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class GoodsBrandModel {
    @prop()
    name: string // 品牌名称

    @prop()
    letter: string // 品牌首字母

    @prop()
    logo?: string // 品牌logo

    @prop()
    description?: string // 描述

    @prop({enum: EnumYN, default: EnumYN.YES})
    status: number // @状态码 1: 显示; 2: 隐藏
}