
/*
* @Descripttion: 商品分类服务
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-16 15:22:31
*/

import { EnumDataType, EnumYN } from '@libs/common/enum/std.enum';
import { ApiException } from '@libs/common/exception/api.exception';
import { JsonHelper } from '@libs/common/helper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';

@Injectable()
export class GoodsCateService {
    constructor(@InjectModel('GoodsCateModel') private readonly goodsCateModel: ModelType<Document>) {}

    /**
     * 获取商品分类
     *
     * @param {string} [type] 返回数据类型
     * @returns
     * @memberof GoodsCateService
     */
    async findGoodsCate(type?: string) {
        const data = await this.goodsCateModel.find().sort({sort: -1});
        if (!type || EnumDataType.LIST === type) {
            return data;
        } else if (EnumDataType.TREE === type) {
            return JsonHelper.treeTransformData(data, '_id', 'pid', 'children');
        }
    }

    /**
     * 添加商品分类
     *
     * @param {string} name 名称
     * @param {any} pid 父编码
     * @param {number} level 分类级别
     * @param {any} icon 文字图标
     * @memberof GoodsCateService
     */
    async addGoodsCate(name: string, pid: any, level: number, icon?: string) {
        try {
            if (pid !== 0) pid = Types.ObjectId(pid);

            // 保存商品分类
            const goodsCate = await this.goodsCateModel.create({name, pid, level, icon});
            return await goodsCate.save();
        } catch (error) {
            throw new ApiException(`添加商品分类失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 修改商品分类
     *
     * @param {string} id 编码
     * @param {string} name 分类名称
     * @param {*} pid 父编码
     * @param {number} level 分类级别
     * @param {string} [icon] 分类文字图标
     * @returns
     * @memberof GoodsCateService
     */
    async upGoodsCate(id: string, name: string, pid: any, level: number, icon?: string) {
        try {
            if (pid !== 0) pid = Types.ObjectId(pid);

            // 修改商品分类
            return await this.goodsCateModel.updateOne({_id: id}, {name, pid, level, icon});

        } catch (error) {
            throw new ApiException(`添加商品分类失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 修改商品分类状态
     *
     * @param {string} id 商品分类编号
     * @param {EnumYN} status 商品分类状态
     * @returns
     * @memberof GoodsCateService
     */
    async upGoodsCateStatus(id: string, status: EnumYN) {
        try {
            return await this.goodsCateModel.updateOne({_id: id}, {status})
        } catch (error) {
            throw new ApiException(`修改商品分类状态异常：${JSON.stringify(error)}`);
        }
    }

    /**
     * 删除商品分类
     *
     * @param {string} id 编码
     * @returns
     * @memberof GoodsCateService
     */
    async delGoodsCate(id: string) {
        try {
            return await this.goodsCateModel.deleteOne({_id: id});
        } catch (error) {
            throw new ApiException(`删除商品分类失败：${JSON.stringify(error)}`);
        }
    }
}