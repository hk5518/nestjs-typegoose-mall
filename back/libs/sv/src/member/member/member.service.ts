/*
* @Descripttion: 会员服务
* @version: 1.0
* @Author: hk5518
* @Date: 2020-05-01 16:06:55
*/

import { EnumSex } from '@libs/common/enum/std.enum';
import { ApiException } from '@libs/common/exception/api.exception';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { isEmail, isMobilePhone } from 'class-validator';
import { MemberModel } from './model/member.model';

@Injectable()
export class MemberService {
    constructor(
        @InjectModel('MemberModel') private readonly memberModel: ReturnModelType<typeof MemberModel>
    ) {}

    /**
     * 根据会员名加载会员
     *
     * @param {string} name 会员名
     * @returns 会员实体
     * @memberof UserService
     */
    async loadMemberByName(name: string): Promise<any> {
        try {
            return await this.memberModel.findOne({ name }).select('+password');
        } catch (error) {
            throw new ApiException(`加载用户异常，用户名为：${name}`);
        }
    }

    // 添加会员
    async addMember(name: string, password: string, email: string, sex: EnumSex, birthday: string, phone: number, slogn: string, avatar: string) {
        const member = await this.loadMemberByName(name);
        if(member) throw new ApiException('会员名称已存在！');

        if(!isEmail(email)) throw new ApiException('会员邮箱地址不合法！');

        if(!isMobilePhone(phone)) throw new ApiException('会员手机号格式不合法！');

        try {
            const newMember = await this.memberModel.create({
                name,
                password,
                email,
                sex,
                birthday,
                phone,
                slogn,
                avatar
            });
            await newMember.save();
            
        } catch (error) {
            throw new ApiException(JSON.stringify(error));
        }
    }
}