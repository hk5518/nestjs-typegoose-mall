/*
* @Descripttion: 角色资源模型
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-08 08:45:08
*/
import { modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: {virtuals: true}
    }
})

export class RoleAccessModel {
    @prop({type: Types.ObjectId})
    role_id: any // 角色编号

    @prop({type: Types.ObjectId})
    access_id: any // 资源编号
}