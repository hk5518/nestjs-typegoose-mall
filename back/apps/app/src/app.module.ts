/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-05-02 11:18:49
 */
import { SvModule } from '@libs/sv';
import { Module } from '@nestjs/common';
import { ChatController } from './chat/chat.controller';
import { MemberController } from './member/member.controller';

@Module({
  imports: [
    SvModule
  ],
  controllers: [MemberController, ChatController]
})
export class AppModule {}
