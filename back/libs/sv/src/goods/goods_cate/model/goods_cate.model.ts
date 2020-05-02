/*
* @Descripttion: 商品分类模型
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-13 10:22:23
*/
import { EnumYN } from '@libs/common/enum/std.enum';
import { ObjectId } from '@libs/common/interface';
import { arrayProp, modelOptions, mongoose, prop, Ref } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class GoodsCateModel {
    @prop()
    name: string // 分类名称

    @prop()
    icon: string // 分类图标

    @prop({required: true, type: mongoose.Schema.Types.ObjectId})
    pid: ObjectId // 分类父编号

    @prop()
    level: number // 分类级别

    @prop({enum: EnumYN, default: EnumYN.YES})
    status: number // 状态码

    @prop({default: 100})
    sort: number // 排序码

    @arrayProp({ref: 'GoodsCateModel', localField: '_id', foreignField: 'pid'})
    children: Ref<this>[]
}