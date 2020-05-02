/*
 * @Descripttion: 聊天模型
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-04-10 18:09:07
 */
import { modelOptions, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {
            virtuals: true
        }

    }
})
export class ChatModel {
    @prop({type: Types.ObjectId})
    user_id: any // 用户编码

    @prop()
    content: string // 消息内容
}