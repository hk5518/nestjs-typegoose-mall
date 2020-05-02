/*
 * @Descripttion: 会员模型
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-05-01 15:50:10
 */
import { EnumSex } from '@libs/common/enum/std.enum';
import { PasswordHelper } from '@libs/common/helper';
import { modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { EnumYN } from '../../../../../common/src/enum/std.enum';


@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class MemberModel {
    @prop()
    name: string // 会员名

    @prop({
        select: false,
        get(val) { return val; },
        set(val) { return val ? PasswordHelper.hashPassword(val) : val; }
    })
    password: string // 会员密码

    @prop()
    email: string // 会员邮箱

    @prop({enum: EnumSex, default: EnumSex.NEUTRAL})
    sex: number // 会员性别

    @prop({type: Schema.Types.Date})
    birthday: string // 会员生日

    @prop()
    phone: number // 会员手机号

    @prop()
    slogn: string // 会员标语

    @prop()
    avatar: string // 会员头像

    @prop({enum: EnumYN, default: EnumYN.NO})
    isActive: number // 状态
}