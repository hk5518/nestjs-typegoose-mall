/*
* @Descripttion: 用户schema
* @version: 1.0
* @Author: hk55181
* @Date: 2020-02-21 16:59:43
*/
import { EnumYN } from '@libs/common/enum/std.enum';
import { PasswordHelper } from '@libs/common/helper';
import { RoleModel } from '@libs/sv/sys/role/model/role.model';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';


@modelOptions({
    schemaOptions: {
        timestamps: true, // 为true时，扩展添加时间、更新时间字段
        toJSON: { virtuals: true } // 为true时，可以查询出虚拟字段
    }
})
export class UserModel {
    @prop({unique: true})
    username: string

    @prop({
        select: false,
        get(val) { return val; },
        set(val) { return val ? PasswordHelper.hashPassword(val) : val; }
    })
    password: string

    @prop()
    mobile: string

    @prop()
    email: string

    @prop({enum: EnumYN, default: EnumYN.YES})
    status: number

    @prop({type: Schema.Types.ObjectId})
    role_id: any

    @prop({enum: EnumYN, default: EnumYN.NO})
    is_super: number

    @prop({
        ref: 'RoleModel',
        localField: 'role_id',
        foreignField: '_id',
        justOne: true
    })
    role: Ref<RoleModel>
}