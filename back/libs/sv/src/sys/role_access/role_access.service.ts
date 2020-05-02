
/*
* @Descripttion: 角色资源服务
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-08 08:44:54
*/

import { ApiException } from '@libs/common/exception/api.exception';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { RoleAccessModel } from './model/role_access.model';

@Injectable()
export class RoleAccessService {
    constructor(@InjectModel('RoleAccessModel') private readonly roleAccessModel: ReturnModelType<typeof RoleAccessModel>) {}

    /**
     * 添加角色资源关系
     *
     * @param {string} role_id 角色编号
     * @param {string} access_ids 资源编号，默认以逗号隔开
     * @returns {Promise<any>}
     * @memberof RoleAccessService
     */
    async addRoleAccess(role_id: string, access_ids: string): Promise<any> {
        let accessIds = [], json = [];
        try {
            // 资源编号转换成数组
            accessIds = access_ids.split(',');

            // 构建插入数据
            accessIds.map(item => {
                json.push({role_id: Types.ObjectId(role_id), access_id: Types.ObjectId(item)})
            })

            // 删除当前角色下面的所有权限
            await this.roleAccessModel.deleteMany({role_id});

            // 把当前角色对应的所有权限增加到role_access表里面
            return await this.roleAccessModel.insertMany(json);
        } catch (error) {
            throw new ApiException(`插入角色资源失败：${error}`);
        }
    }

    /**
     * 批量删除角色资源关系数据
     *
     * @param {string} access_ids 资源编号
     * @memberof RoleAccessService
     */
    async delManyAccess(access_ids: string) {
        try {
            // 资源编号转换成数组
            let accessIds = access_ids.split(',');

            // 删除当前资源
            return await this.roleAccessModel.deleteMany({access_id: {$in: accessIds}});
        } catch (error) {
            throw new ApiException(`批量删除资源失败：${error}`);
        }
    }

    /**
     * 查询角色资源
     *
     * @param {*} json 查询条件
     * @param {string} [fields] 查询的字段
     * @returns
     * @memberof RoleAccessService
     */
    async findRoleAccess(json: any, fields?: string) {
        try {
            return await this.roleAccessModel.find(json, fields);
        } catch (error) {
            throw new ApiException(`查询角色资源失败：${JSON.stringify(error)}`);
        }
    }
}