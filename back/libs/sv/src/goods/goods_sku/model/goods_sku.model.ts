/*
* @Descripttion: 商品sku模型
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-13 10:39:56
*/
import { EnumYN } from '@libs/common/enum/std.enum';
import { modelOptions, prop, Typegoose } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class GoodsSkuModel extends Typegoose {

    @prop({unique: true, index: true})
    sn: string // 商品唯一码

    @prop()
    name: string // 商品sku名称

    @prop()
    price: string // 商品价格

    @prop()
    amount: string // 商品数量库

    @prop()
    barcode?: string // 商品条形码

    @prop()
    pic?: string // 商品sku图片

    @prop({enum: EnumYN, default: EnumYN.NO})
    is_default: number // @是否默认选中 0:不默认 1: 默认

    @prop({enum: EnumYN, default: EnumYN.YES})
    status: number // @状态 0: 未启用；1:启用

    @prop()
    sku_json: any // sku销售属性
}