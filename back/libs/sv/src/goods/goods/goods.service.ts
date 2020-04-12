import { EnumGoodsStatus, EnumYN } from '@libs/common/enum/std.enum';
import { ApiException } from '@libs/common/exception/api.exception';
import { StrHelper } from '@libs/common/helper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Validator } from 'class-validator';
import { Types } from 'mongoose';
import { v1 as uuidv1 } from 'uuid';
import { GoodsDescModel } from '../goods_desc/model/goods_desc.model';
import { GoodsSkuService } from '../goods_sku/goods_sku.service';
import { GoodsModel } from './model/goods.model';

@Injectable()
export class GoodsService {
    validator: any
    constructor(
        @InjectModel('GoodsModel') private readonly goodsModel: ReturnModelType<typeof GoodsModel>,
        @InjectModel('GoodsDescModel') private readonly goodsDescModel: ReturnModelType<typeof GoodsDescModel>,
        private readonly goodsSkuService: GoodsSkuService
    ){
        this.validator = new Validator();
    }

    /**
     * 查询商品
     *
     * @param {string} [keyword=''] 查询关键词
     * @param {number} page 页码
     * @param {number} size 每页条数
     * @returns
     * @memberof GoodsService
     */
    async qryGoods(keyword: string = '', page: number, size: number) {
        // 去除关键词的左右空格
        const newKeyword = StrHelper.trim(keyword);
        const reg: any = new RegExp(newKeyword, 'i');
        const match = {
            'name': { $regex: reg }
        };

        // 获取用户的总数
        const total = await this.goodsModel.countDocuments(match);

        // 获取用户列表
        const list = await this.goodsModel
        .find(match)
        .populate('desc')
        .populate('sku')
        .skip((page - 1) * size)
        .limit(size)
        .sort({updatedAt: -1});

        return {total, page, size, list}
    }

    /**
     * 根据商品唯一编码查询商品
     *
     * @param {string} sn 商品唯一编码
     * @memberof GoodsService
     */
    async loadGoodsBySn(sn: string) {
        return await this.goodsModel.findOne({sn}).populate('desc').populate('sku');
    }

    /**
     * 添加商品
     *
     * @param {string} name 商品名称
     * @param {number} price 价格
     * @param {number} weight 重量
     * @param {number} amount 数量
     * @param {any[]} goods_cate 分类编码数组
     * @param {string} goods_brand_id 品牌编号
     * @param {number} is_sale 是否开启销售属性
     * @param {any[]} sale_attr 销售属性
     * @param {any[]} basic_attr 包装规格属性
     * @param {any[]} goods_sku sku数组
     * @param {string} [sub_name] 商品概述
     * @param {string} [content] 商品详情
     * @param {string[]} [pic] 商品图片
     * @memberof GoodsService
     */
    async addGoods(name: string, price: number, weight: number, amount: number, goods_cate: any[], goods_brand_id: string, is_sale: number, sale_attr: any[], basic_attr: any[], goods_sku: any[], sub_name?: string, content?: string, pic?: string[]) {
        const goods_cate_id1 = goods_cate[0];
        const goods_cate_id2 = goods_cate[1];
        const goods_cate_id3 = goods_cate[2];

        const sn = uuidv1();

        try {

            // 1、添加商品
            const goods= await this.goodsModel.create({name, sub_name, sn, price, weight, amount, is_sale, goods_brand_id: Types.ObjectId(goods_brand_id), goods_cate_id1: Types.ObjectId(goods_cate_id1), goods_cate_id2: Types.ObjectId(goods_cate_id2), goods_cate_id3: Types.ObjectId(goods_cate_id3), pic: pic.join(',')});

            const goodsResult = await goods.save();
            if (!goodsResult) throw new ApiException('添加商品失败！');

            // 2、添加商品销售属性、规格属性
            const goodsAttrJson = await this.goodsDescModel.create({sn, content, spec_json: basic_attr, sale_json: sale_attr});
            const goodsAttrJsonResult = await goodsAttrJson.save();
            if (!goodsAttrJsonResult) throw new ApiException('添加商品属性失败！');

            // 3、添加商品sku
            for(const item of goods_sku) {
                const sku_name = `${name} ${Object.values(item.sku_json).join(' ')}`;
                await this.goodsSkuService.addGoodsSku(sn, sku_name, item.price, item.amount, item.sku_json, item.is_default, item.status);
            }

            // 添加商品图片
            return true;

        } catch (error) {
            throw new ApiException(`添加商品失败:${JSON.stringify(error)}`);
        }
    }

    /**
     * 修改商品
     *
     * @param {string} sn 商品唯一码
     * @param {string} name 商品名称
     * @param {number} price 价格
     * @param {number} weight 重量
     * @param {number} amount 数量
     * @param {any[]} goods_cate 分类编码数组
     * @param {string} goods_brand_id 品牌编号
     * @param {number} is_sale 是否开启销售属性
     * @param {any[]} sale_attr 销售属性
     * @param {any[]} basic_attr 包装规格属性
     * @param {any[]} goods_sku sku数组
     * @param {string} [sub_name] 商品概述
     * @param {string} [content] 商品详情
     * @param {string[]} [pic] 商品图片
     * @memberof GoodsService
     */
    async upGoods(sn: string, name: string, price: number, weight: number, amount: number, goods_cate: any[], goods_brand_id: string, is_sale: number, sale_attr: any[], basic_attr: any[], goods_sku: any[], sub_name?: string, content?: string, pic?: string[]) {
        const goods_cate_id1 = goods_cate[0];
        const goods_cate_id2 = goods_cate[1];
        const goods_cate_id3 = goods_cate[2];

        try {

            const goods = await this.goodsModel.findOne({sn});

            // 检测商品是否存在
            if (!goods) throw new ApiException(`商品编码不正确!`)

            // 检测商品状态,只有未上架的商品才可以修改
            if (goods.status === EnumGoodsStatus.UP || goods.status === EnumGoodsStatus.DEL) {
                throw new ApiException(`商品状态不合法：不允许修改！`);
            }

            // 1、修改商品
            const goodsResult = await this.goodsModel.updateOne({sn}, {name, sub_name, sn, price, weight, amount, is_sale, goods_brand_id: Types.ObjectId(goods_brand_id), goods_cate_id1: Types.ObjectId(goods_cate_id1), goods_cate_id2: Types.ObjectId(goods_cate_id2), goods_cate_id3: Types.ObjectId(goods_cate_id3), pic: pic.join(',')});
            if (!goodsResult) throw new ApiException('修改商品失败！');

            // 2、修改商品销售属性、规格属性
            const goodsAttrJsonResult = await this.goodsDescModel.updateOne({sn}, {content, spec_json: basic_attr, sale_json: sale_attr});
            if (!goodsAttrJsonResult) throw new ApiException('修改商品属性失败！');

            // 3、删除商品sku数据
            await this.goodsSkuService.delGoodsSkuBySn(sn);

            // 4、重新添加商品sku
            for(const item of goods_sku) {
                const sku_name = `${name} ${Object.values(item.sku_json).join(' ')}`;
                await this.goodsSkuService.addGoodsSku(sn, sku_name, item.price, item.amount, item.sku_json, item.is_default, item.status);
            }

            return true;

        } catch (error) {
            throw new ApiException(`${error}`);
        }
    }

    /**
     * 修改商品状态
     *
     * @param {string} sn 商品码
     * @param {EnumGoodsStatus} status 商品状态
     * @memberof GoodsService
     */
    async upGoodsStatus(sn: string, status: EnumGoodsStatus) {
        try {
            const goods = await this.goodsModel.findOne({sn});
            if (!goods) throw new ApiException('此商品不存在！');

            if (goods.status == EnumGoodsStatus.DEL) {
                throw new ApiException('已删除的商品不能上下架！')
            }

            let data = null;

            switch (status) {
                case EnumGoodsStatus.UP:
                    data = {status, launchTime: new Date()}
                    break;
                case EnumGoodsStatus.DOWN:
                    data = {status, is_hot: EnumYN.NO, is_best: EnumYN.NO, is_new: EnumYN.NO, underTime: new Date()}
                    break;
                default:
                    break;
            }

            // 上下架处理
            await this.goodsModel.updateOne({sn}, data)
            return await this.goodsModel.findOne({sn});

        } catch (error) {
            throw new ApiException(`${error}`);
        }
    }

    /**
     * 更新商品是否热销
     *
     * @param {string} sn 商品码
     * @param {number} is_hot 是否热销
     * @returns
     * @memberof GoodsService
     */
    async upGoodsIsHot(sn: string, is_hot: number) {
        try {
            const goods = await this.goodsModel.findOne({sn});
            if (!goods) throw new ApiException('此商品不存在！');

            if (goods.status === EnumGoodsStatus.DEL || goods.status === EnumGoodsStatus.DOWN) {
                throw new ApiException('只有已上架的商品才可以设置是否热销！')
            }
            return await this.goodsModel.updateOne({sn}, {is_hot})
        } catch (error) {
            throw new ApiException(`${error}`);
        }
    }

    /**
     * 更新商品是否精品
     *
     * @param {string} sn 商品码
     * @param {number} is_hot 是否精品
     * @returns
     * @memberof GoodsService
     */
    async upGoodsIsBest(sn: string, is_best: number) {
        try {
            const goods = await this.goodsModel.findOne({sn});
            if (!goods) throw new ApiException('此商品不存在！');

            if (goods.status === EnumGoodsStatus.DEL || goods.status === EnumGoodsStatus.DOWN) {
                throw new ApiException('只有已上架的商品才可以设置是否精品！')
            }
            return await this.goodsModel.updateOne({sn}, {is_best})
        } catch (error) {
            throw new ApiException(`${error}`);
        }
    }

    /**
     * 更新商品是否新品
     *
     * @param {string} sn 商品码
     * @param {number} is_hot 是否新品
     * @returns
     * @memberof GoodsService
     */
    async upGoodsIsNew(sn: string, is_new: number) {
        try {
            const goods = await this.goodsModel.findOne({sn});
            if (!goods) throw new ApiException('此商品不存在！');

            if (goods.status === EnumGoodsStatus.DEL || goods.status === EnumGoodsStatus.DOWN) {
                throw new ApiException('只有已上架的商品才可以设置是否新品')
            }

            return await this.goodsModel.updateOne({sn}, {is_new})
        } catch (error) {
            throw new ApiException(`${error}`);
        }
    }
}