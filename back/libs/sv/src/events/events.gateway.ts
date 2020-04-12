/*
 * @Descripttion: 事件网关
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-04-07 18:08:12
 */
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'net';
import { ChatService } from '../chat/chat.service';

@WebSocketGateway(7001, {
    namespace: 'webscoket'
})
export class EventsGateway {
    @WebSocketServer() server: any;
    constructor(
        private readonly chatService: ChatService
    ) { }

    /**
     * 网关 获取聊天消息
     *
     * @memberof EventsGateway
     */
    @SubscribeMessage('chat_chats')
    async onChats() {
        const chats = await this.chatService.findChat();
        this.server.emit('chat_chats', {
            event: 'chat_chats',
            data: chats
        });
    }

    /**
     * 网关 添加聊天消息
     *
     * @param {Socket} client webscoket客户端
     * @param {*} payload 提交数据
     * @memberof EventsGateway
     */
    @SubscribeMessage('chat_addChat')
    async onAddChat(client: Socket, payload: any) {
        await this.chatService.addChat(payload.data.user_id, payload.data.content);
        this.onChats();
    }
}