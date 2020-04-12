/*
* @Descripttion: 
* @version: 1.0
* @Author: hk5518
* @Date: 2020-04-10 18:08:52
*/

import { ApiException } from '@libs/common/exception/api.exception';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { ChatModel } from './model/chat.model';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel('ChatModel') private readonly chatModel: ReturnModelType<typeof ChatModel>
    ) { }

    /**
     * 查询聊天信息
     *
     * @returns
     * @memberof ChatSerice
     */
    async findChat() {
        return await this.chatModel.find().sort({createdAt: -1});
    }

    /**
     * 添加聊天
     *
     * @param {string} userId 用户编码
     * @param {string} content 聊天内容
     * @returns
     * @memberof ChatSerice
     */
    async addChat(userId: string, content: string) {
        try {
            const chatRes = await this.chatModel.create({user_id: Types.ObjectId(userId), content});
            return await chatRes.save();
        } catch (error) {
            throw new ApiException(error);
        }
    }
}