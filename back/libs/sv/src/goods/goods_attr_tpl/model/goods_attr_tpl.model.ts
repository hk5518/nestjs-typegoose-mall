/*
* @Descripttion: 商品属性模型
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-13 10:39:56
*/
import { EnumAttrType, EnumYN } from '@libs/common/enum/std.enum';
import { modelOptions, prop, Typegoose } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class GoodsAttrTplModel extends Typegoose {
    @prop()
    name: string // 属性名称

    @prop({type: Array})
    attr_vals?: any[] // 属性值

    @prop({enum: EnumAttrType, default:  EnumAttrType.SPEC})
    type: number // 属性类型

    @prop({enum: EnumYN, default: EnumYN.YES})
    status: number // @状态码 1: 显示; 2: 隐藏

    @prop({type: Types.ObjectId})
    goods_cate_id: any // 商品分类编码
}