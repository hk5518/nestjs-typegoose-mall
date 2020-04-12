/*
* @Descripttion: 商品属性服务
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-16 15:22:31
*/

import { EnumAttrType } from '@libs/common/enum/std.enum';
import { ApiException } from '@libs/common/exception/api.exception';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';

@Injectable()
export class GoodsAttrTplService {
    constructor(
        @InjectModel('GoodsAttrTplModel') private readonly goodsAttrTplModel: ModelType<Document>
    ) {}

    /**
     * 根据类型获取商品属性
     *
     * @param {EnumAttrType} goods_cate_id 商品三级分类编码
     * @param {EnumAttrType} [type] 类型
     * @returns
     * @memberof GoodsAttrService
     */
    async findGoodsAttrTpl(goods_cate_id: string, type?: EnumAttrType) {
        const tempType = type ? type : EnumAttrType.SPEC;
        return await this.goodsAttrTplModel.find({goods_cate_id: Types.ObjectId(goods_cate_id), type: tempType}).sort({sort: -1});
    }

    /**
     * 添加商品属性
     *
     * @param {string} name 属性名称
     * @param {EnumAttrType} type 属性类型
     * @param {string} goods_cate_id 商品分类编码
     * @memberof GoodsAttrService
     */
    async addGoodsAttrTpl(name: string, type: EnumAttrType, goods_cate_id: any) {
        try {
            if (goods_cate_id) goods_cate_id = Types.ObjectId(goods_cate_id);

            // 保存商品属性
            const goodsCate = await this.goodsAttrTplModel.create({name, type, goods_cate_id});
            return await goodsCate.save();
        } catch (error) {
            throw new ApiException(`添加商品属性失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 修改商品属性
     *
     * @param {string} id 编码
     * @param {string} name 属性名称
     * @param {EnumAttrType} type 属性类型
     * @param {string} goods_cate_id 商品分类编码
     * @returns
     * @memberof GoodsAttrService
     */
    async upGoodsAttrTpl(id: string, name: string, type: EnumAttrType, goods_cate_id: any) {
        try {
            if (goods_cate_id) goods_cate_id = Types.ObjectId(goods_cate_id);

            // 修改商品属性
            return await this.goodsAttrTplModel.updateOne({_id: id}, {name, type, goods_cate_id});

        } catch (error) {
            throw new ApiException(`修改商品属性失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 更新商品属性值
     *
     * @param {string} id 属性编码
     * @param {any[]} attr_vals 属性值
     * @returns
     * @memberof GoodsAttrService
     */
    async upGoodsAttrTplVal(id: string, attr_vals: any[]) {
        try {
            const res = await this.goodsAttrTplModel.updateOne({_id: id}, {attr_vals});
            return res;
        } catch (error) {
            throw new ApiException(`更新商品属性值失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 删除商品属性
     *
     * @param {string} id 编码
     * @returns
     * @memberof GoodsAttrService
     */
    async delGoodsAttrTpl(id: string) {
        try {
            // 删除属性
            return await this.goodsAttrTplModel.deleteOne({_id: id});

        } catch (error) {
            throw new ApiException(`删除商品属性失败：${JSON.stringify(error)}`);
        }
    }
}