/*
 * @Descripttion: 资源服务
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-06 11:08:48
 */
import { EnumAccessType, EnumDataType } from '@libs/common/enum/std.enum';
import { ApiException } from '@libs/common/exception/api.exception';
import { JsonHelper } from '@libs/common/helper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';


@Injectable()
export class AccessService {
    constructor(
        @InjectModel('AccessModel') private readonly accessModel: ModelType<Document>
    ) {}


    /**
     * 添加资源
     *
     * @param {string} name 资源名称
     * @param {number} type 资源类型
     * @param {([string | number])} pid 资源编号
     * @param {string} url 路由url地址
     * @param {string} [icon] 文字图标
     * @param {number} sort 排序码
     * @param {string} [description] 资源描述
     * @returns {Promise<any>}
     * @memberof AccessService
     */
    async addAccess(name: string, type: number, pid: any, url: string, icon?: string, sort?: number, description?: string): Promise<any> {
        if (type === EnumAccessType.MODULE && pid !== '0') throw new ApiException('资源类型选择为资源时，所属资源必须是顶级模块！')
        if (pid !== '0') pid = Types.ObjectId(pid);

        try {
            const access = await this.accessModel.create({name, type, pid, url, icon, sort, description});
            return access.save();
        } catch (error) {
            throw new ApiException(`添加资源失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 更新资源
     *
     * @param {string} _id 资源编号
     * @param {string} name 资源名称
     * @param {number} type 资源类型
     * @param {*} pid 所属资源编号icon
     * @param {string} url url地址
     * @param {string} [icon] 文字图标
     * @param {number} [sort] 排序
     * @param {string} [description] 描述
     * @returns
     * @memberof AccessService
     */
    async upAccess(_id: string, name: string, type: number, pid: any, url: string, icon?: string, sort?: number, description?: string) {
        if (type === EnumAccessType.MODULE && pid !== '0') throw new ApiException('资源类型选择为资源时，所属资源必须是顶级模块！')
        if (pid !== '0') pid = Types.ObjectId(pid);

        try {
            return await this.accessModel.updateOne({_id}, {name, type, pid, url, icon, sort, description});
        } catch (error) {
            throw new ApiException(`更新资源失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 删除单条资源
     *
     * @param {string} _id 资源编号
     * @returns
     * @memberof AccessService
     */
    async delAccess(_id: string) {
        try {
            return this.accessModel.deleteOne({_id});
        } catch (error) {
            throw new ApiException(`删除资源异常:${JSON.stringify(error)}`);
        }
    }

    /**
     * 查询所有资源
     *
     * @param {string} [type] 返回数据类型
     * @returns
     * @memberof AccessService
     */
    async findAccess(type?: string) {
        const data = await this.accessModel.find().sort({sort: -1});
        if (!type || EnumDataType.LIST === type) {
            return data;
        } else if (EnumDataType.TREE === type) {
            return JsonHelper.treeTransformData(data, '_id', 'pid', 'children');
        }
    }
}