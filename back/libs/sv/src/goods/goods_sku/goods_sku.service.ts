/*
* @Descripttion: 商品sku服务
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-25 19:46:23
*/
import { ApiException } from '@libs/common/exception/api.exception';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { GoodsSkuModel } from './model/goods_sku.model';

@Injectable()
export class GoodsSkuService {
    constructor(
        @InjectModel('GoodsSkuModel') private readonly goodsSkuModel: ReturnModelType<typeof GoodsSkuModel>
    ) {}

    /**
     * 添加商品sku
     *
     * @param {string} sn 商品唯一码
     * @param {string} name sku名称
     * @param {number} price 商品价格
     * @param {number} amount 商品数量
     * @param {string} sku_json sku销售属性
     * @param {number} is_default 是否默认
     * @param {number} status 是否开启
     * @memberof GoodsSkuService
     */
    async addGoodsSku(sn: string, name: string, price: number, amount: number, sku_json: any, is_default: number, status: number) {
        try {
            const goodsSku = await this.goodsSkuModel.create({sn, name, price, amount, sku_json, is_default, status});
            return await goodsSku.save();
        } catch (error) {
            throw new ApiException(`添加商品sku失败:${JSON.stringify(error)}`);
        }
    }

    /**
     * 根据商品唯一码，批量删除商品sku
     *
     * @param {string} sn
     * @returns
     * @memberof GoodsSkuService
     */
    async delGoodsSkuBySn(sn: string) {
        try {
            return await this.goodsSkuModel.deleteMany({sn})
        } catch (error) {
            throw new ApiException(`批量删除商品sku失败:${JSON.stringify(error)}`);
        }
    }
}