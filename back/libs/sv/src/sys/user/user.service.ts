/*
 * @Descripttion: 用户服务
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-02-21 16:23:24
 */
import { EnumYN } from '@libs/common/enum/std.enum';
import { ApiException } from '@libs/common/exception/api.exception';
import { PasswordHelper, StrHelper } from '@libs/common/helper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Validator } from 'class-validator';
import { Types } from 'mongoose';


@Injectable()
export class UserService {
    validator: any
    constructor(
        @InjectModel('UserModel') private readonly userModel: ModelType<Document>
    ) {
        this.validator = new Validator();
    }

    async qryUsersAll(keyword: string = '', page: number = 1, size: number = 10) {
        // 去除关键词的左右空格
        const newKeyword = StrHelper.trim(keyword);
        const reg: any = new RegExp(newKeyword, 'i');

        // 判断关键词的类型
        let match = {};
        if(this.validator.isEmail(newKeyword)) {
            match = { 'email': { $regex: reg } }
        } else if(this.validator.isMobilePhone(newKeyword)) {
            match = { 'mobile': { $regex: reg } }
        } else {
            match = { 'username': { $regex: reg } }
        }

        // 获取用户的总数
        const total = await this.userModel.countDocuments(match);

        // 获取用户列表
        const list = await this.userModel
        .find(match)
        .populate('role')
        .skip((page - 1) * size)
        .limit(size)
        .sort({updatedAt: -1});

        return {total, page, size, list}
    }

    /**
     * 查询所有用户
     *
     * @param {string} [keyword=''] 查询关键词
     * @param {number} page 当前页码
     * @param {number} size 每页条数
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async qryUsers(keyword: string = '', page: number, size: number): Promise<any> {
        // 去除关键词的左右空格
        const newKeyword = StrHelper.trim(keyword);
        const reg: any = new RegExp(newKeyword, 'i');

        // 判断关键词的类型
        let match = {};
        if(this.validator.isEmail(newKeyword)) {
            match = { 'email': { $regex: reg } }
        } else if(this.validator.isMobilePhone(newKeyword)) {
            match = { 'mobile': { $regex: reg } }
        } else {
            match = { 'username': { $regex: reg } }
        }

        // 获取用户的总数
        const total = await this.userModel.countDocuments(match);

        // 获取用户列表
        const list = await this.userModel.aggregate([
            { $match: match },
            { $lookup: { from: 'role', localField: 'role_id', foreignField: '_id', as: 'role' } },
            { $unwind: '$role'},
            { $skip: (page - 1) * size },
            { $limit: size },
            { $sort: {updatedAt: -1}}
        ]);

        return {total, page, size, list}
    }

    /**
     * 根据用户id加载用户
     *
     * @param {string} id 用户编码
     * @returns 用户实体
     */
    async loadUserById(id: string): Promise<any> {
        try {
            const res = await this.userModel.findById(id);
            return res;
        } catch (error) {
            throw new ApiException(`加载用户异常，用户编码为：${id}`);
        }
    }

    /**
     * 根据用户名加载用户
     *
     * @param {string} username 用户名称
     * @returns 用户实体
     * @memberof UserService
     */
    async loadUserByUsername(username: string): Promise<any> {
        try {
            const res = await this.userModel.findOne({ username }).select('+password').populate('role');
            return res;
        } catch (error) {
            throw new ApiException(`加载用户异常，用户名为：${username}`);
        }
    }

    /**
     * 用户登录
     *
     * @param {string} username 用户名
     * @param {string} password 用户密码
     * @returns 用户实体
     * @memberof UserService
     */
    async login(username: string, password: string): Promise<any> {
        // 检测用户是否存在
        const user = await this.loadUserByUsername(username);
        if (this.validator.isEmpty(user)) throw new ApiException('用户不存在！');

        // 检测密码是否正确
        const flag = await PasswordHelper.comparePassword(password, user.password);
        if (!flag) throw new ApiException('账号或密码错误！');

        // 检测用户状态是否合法化
        if (!user.status) throw new ApiException('账号已被禁用，无法登录，请联系管理员!');

        return user;
    }

    /**
     * 添加用户
     *
     * @param {string} username 用户名
     * @param {string} password 用户密码
     * @param {string} mobile 用户手机号
     * @param {string} role_id 角色编码
     * @param {string} [email] 用户邮箱
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async addUser(username: string, password: string, mobile: string, role_id: string, email?: string): Promise<any> {
        // 检测用户是否存在
        const user = await this.loadUserByUsername(username);
        if (user) throw new ApiException('用户名已经存在！');

        // 创建并保存用户
        try {
            const new_role_id = Types.ObjectId(role_id);
            const newUser = await this.userModel.create({username, password, mobile, email, role_id: new_role_id});
            const result = await newUser.save();
            return result;
        } catch (error) {
            throw new ApiException(`注册失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 更新用户
     *
     * @param {string} _id 用户编号
     * @param {string} mobile 用户手机号
     * @param {string} role_id 角色编号
     * @param {string} [email] 邮箱
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async upUser(_id: string, mobile: string, role_id: string, email?: string): Promise<any> {
        const new_role_id = Types.ObjectId(role_id);
        const user = {mobile, role_id: new_role_id, email}
        try {
            return await this.userModel.updateOne({_id}, {...user});
        } catch (error) {
            throw new ApiException(`更新用户失败：${JSON.stringify(error)}`);
        }
    }

    /**
     * 更新用户密码
     *
     * @param {string} _id 用户编码
     * @param {string} old_password 原密码
     * @param {string} new_password 新密码
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async upUserPassword(_id: string, old_password: string, new_password: string): Promise<any> {
        // 检测用户是否存在
        const user: any = await this.userModel.findById(_id).select('+password');
        if (!user) throw new ApiException('用户不存在！');

        // 检测原密码是否正确
        const flag = await PasswordHelper.comparePassword(old_password, user.password);
        if (!flag) throw new ApiException('原密码不正确！');

        // 更新密码
        user.password = new_password;
        return await user.save();
    }

    /**
     * 更新用户状态
     *
     * @param {string} _id 用户编号
     * @param {number} status 用户状态
     * @returns
     * @memberof UserService
     */
    async upUserStatus(_id: string, status: EnumYN) {
        try {
            return await this.userModel.updateOne({_id}, {status})
        } catch (error) {
            throw new ApiException(`更新用户状态异常：${JSON.stringify(error)}`);
        }
    }

    /**
     * 删除用户
     *
     * @param {string} _id 用户编号
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async delUser(_id: string): Promise<any> {
        try {
            const res = await this.userModel.deleteOne({_id});
            return res;
        } catch (error) {
            throw new ApiException(`删除失败：${JSON.stringify(error)}`);
        }
    }
}
