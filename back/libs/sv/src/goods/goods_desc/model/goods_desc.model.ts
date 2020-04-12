/*
* @Descripttion: 商品详情模型
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-13 10:21:17
*/
import { modelOptions, prop, Typegoose } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class GoodsDescModel extends Typegoose {

    @prop({unique: true, index: true})
    sn: string // 商品唯一码

    @prop()
    content: string // 商品详情内容

    @prop()
    sale_json: any[] // 销售属性json数据

    @prop()
    spec_json: any[] // 规格属性json数据

}