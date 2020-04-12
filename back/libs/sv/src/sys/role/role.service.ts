/*
* @Descripttion: 角色服务
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-04 16:07:29
*/
import { ApiException } from '@libs/common/exception/api.exception';
import { JsonHelper, StrHelper } from '@libs/common/helper';
import { AccessService } from '@libs/sv/sys/access/access.service';
import { RoleAccessService } from '@libs/sv/sys/role_access/role_access.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';


@Injectable()
export class RoleService {
    constructor(
        @InjectModel('RoleModel') private readonly roleModel: ModelType<Document>,
        private readonly accessService: AccessService,
        private readonly roleAccessService: RoleAccessService,
    ) {}

    /**
     * 加载所有角色
     *
     * @param {string} [keyword] 检索关键词
     * @returns {Promise<any>}
     * @memberof RoleService
     */
    async findRoles(keyword?: string): Promise<any> {

        const reg: any = new RegExp(StrHelper.trim(keyword), 'i');
        const condition = {title: {$regex: reg}}

        const roles = await this.roleModel.find(condition).sort({updatedAt: -1});
        const newRoles = JSON.parse(JSON.stringify(roles));
        for (const role of newRoles) {
            role.children = await this.findAccessByRoleId(role._id.toString(), 'tree');
        }
        return newRoles;
    }

    /**
     * 添加角色
     *
     * @param {string} title 角色名称
     * @param {string} [description] 角色描述
     * @returns {Promise<any>}
     * @memberof RoleService
     */
    async addRole(title: string, description?: string): Promise<any> {
        // 检测角色是否存在
        const role = await this.roleModel.findOne({title: StrHelper.trim(title)});
        if(role) throw new ApiException(`角色已经存在！`);

        // 保存角色
        try {
            const newRole = await this.roleModel.create({title, description});
            return newRole.save();
        } catch (error) {
            throw new ApiException(`添加失败：${JSON.stringify(error)}`)
        }
    }

    /**
     * 更新角色
     *
     * @param {string} _id 角色编号
     * @param {string} title 角色名称
     * @param {string} [description] 角色描述
     * @returns {Promise<any>}
     * @memberof RoleService
     */
    async upRole(_id: string, title: string, description?: string): Promise<any> {
        try {
            return await this.roleModel.updateOne({_id}, {title, description});
        } catch (error) {
            throw new ApiException(`更新角色失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 删除角色
     *
     * @param {string} _id 角色编号
     * @returns {Promise<any>}
     * @memberof RoleService
     */
    async delRole(_id: string): Promise<any> {
        try {
            return await this.roleModel.deleteOne({_id});
        } catch (error) {
            throw new ApiException(`删除角色失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 根据角色编号查询已关联的资源
     *
     * @param {string} role_id 角色编号
     * @param {string} type 数据返回类型
     * @memberof RoleService
     */
    async findAccessByRoleId(role_id: string, type?: string) {
        if (!role_id) throw new ApiException('角色编号不能空！');

        const accessList = await this.accessService.findAccess();
        const roleAccess = await this.roleAccessService.findRoleAccess({role_id});
        const access_ids = roleAccess.map((item: any) => item.access_id.toString());
        const data = accessList.filter((item: any) => {
            if (access_ids.includes(item._id.toString())) {
                return item;
            }
        })
        if (!type || 'list' === type) {
            return data;
        } else if ('tree' === type) {
            return JsonHelper.treeTransformData(data, '_id', 'pid', 'children');
        }
    }
}