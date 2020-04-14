/*
* @Descripttion: 商品模型
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-13 10:21:17
*/
import { EnumGoodsStatus, EnumYN } from '@libs/common/enum/std.enum';
import { ConfigService } from '@nestjs/config';
import { arrayProp, modelOptions, prop, Ref, Typegoose } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { GoodsDescModel } from '../../goods_desc/model/goods_desc.model';
import { GoodsSkuModel } from './../../goods_sku/model/goods_sku.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class GoodsModel extends Typegoose {

    @prop({type: Types.ObjectId})
    goods_cate_id1: any // 商品一级分类编号

    @prop({type: Types.ObjectId})
    goods_cate_id2: any // 商品二级分类编号

    @prop({type: Types.ObjectId})
    goods_cate_id3: any // 商品三级分类编号

    @prop({type: Types.ObjectId})
    goods_brand_id: any // 品牌编号

    @prop({default: 'haokang'})
    seller_id: string // 商家编码

    @prop({type: Types.ObjectId})
    default_sku_id?: any // 商品默认sku编码

    @prop({unique: true, index: true})
    sn: string // 商品唯一码

    @prop()
    name: string // 商品名称

    @prop()
    sub_name: string // 商品子标题

    @prop({default: 0})
    hit: number // 商品点击量

    @prop()
    price: number // 商品价格

    @prop()
    weight: number // 商品重量

    @prop()
    amount: number // 商品数量

    @prop()
    pic: string // 商品图片

    @prop({enum: EnumYN})
    is_sale: number // 是否开启销售属性

    @prop({enum: EnumYN, default: EnumYN.NO})
    is_hot: number   // @是否热销 0:否；1:是

    @prop({enum: EnumYN, default: EnumYN.NO})
    is_best: number   // @是否精品 0:否；1:是

    @prop({enum: EnumYN, default: EnumYN.NO})
    is_new: number   // @是否新品 0:否；1:是

    @prop({enum: EnumGoodsStatus})
    status: number // @状态码 0: 下架; 1: 上架; 2: 删除

    @prop({default: 100})
    sort: number // 排序码

    @prop({type: Date})
    launchTime?: string // 上架时间

    @prop({type: Date})
    underTime?: string // 下架时间

    @arrayProp({ref: 'GoodsDescModel', localField: 'sn', foreignField: 'sn', justOne: true})
    desc: Ref<GoodsDescModel> // 商品详情

    @arrayProp({ref: 'GoodsSkuModel', localField: 'sn', foreignField: 'sn'})
    sku: Ref<GoodsSkuModel>[]

    // 返回图片数组
    get pics(): string[] {
        return this.pic ? this.pic.split(',') : []
    }

    // 返回带域名的图片地址
    get fullpics(): any[] {
        if (this.pic) {
            const pre_path = `${(new ConfigService).get('IMAGE_HOST')}/static/${(new ConfigService).get('UPLOAD_DIR')}`;
            return this.pic.split(',').map(file => {
                return {
                    url: `${pre_path}/${file}`
                }
            })
        } else {
            return []
        }
    }

}