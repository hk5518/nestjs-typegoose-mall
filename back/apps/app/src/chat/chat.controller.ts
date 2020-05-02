/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-05-02 11:24:06
 */
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ChatController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'hello!'
  }
}