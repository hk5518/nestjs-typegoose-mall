/*
 * @Descripttion: 资源模型
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-06 11:08:57
 */
import { EnumAccessType } from '@libs/common/enum/std.enum';
import { AccessPid } from '@libs/common/interface';
import { arrayProp, modelOptions, mongoose, prop, Ref } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class AccessModel {
    @prop()
    name: string // 资源名称

    @prop({enum: EnumAccessType})
    type: number // 资源类型: 1、模块  2、菜单  3、操作

    @prop()
    url: string // 路由地址

    @prop({required: true, type: mongoose.Schema.Types.Mixed})
    pid: AccessPid // 资源编号和当前模型的_id关联，pid = 0 表示模块

    @prop()
    icon: string // 文字图标

    @prop({default: 100})
    sort: number // 排序码

    @prop()
    description: string // 描述

    @arrayProp({ref: 'AccessModel', localField: '_id', foreignField: 'pid'})
    children: Ref<this>[] // 虚拟字段
}