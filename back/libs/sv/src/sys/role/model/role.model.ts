/*
 * @Descripttion: 角色schema
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-04 16:09:26
 */
import { Typegoose, prop, modelOptions } from '@typegoose/typegoose';

import { EnumYN } from '@libs/common/enum/std.enum';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: { virtuals: true }
    }
})
export class RoleModel extends Typegoose {
    @prop({unique: true})
    title: string

    @prop()
    description: string

    @prop({enum: EnumYN, default: EnumYN.YES})
    status: number

}