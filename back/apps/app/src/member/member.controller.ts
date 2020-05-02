/*
* @Descripttion: 
* @version: 1.0
* @Author: hk5518
* @Date: 2020-05-01 16:59:23
*/

import { EmailHelper } from '@libs/common/helper';
import { MemberService } from '@libs/sv/member/member/member.service';
import { Body, Controller, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller(`${(new ConfigService).get('APP_PATH')}/member`)
@ApiTags('会员')
export class MemberController {
    constructor(
        private readonly memberService: MemberService
    ) {}

    @Post('addMember')
    @ApiOperation({summary: '添加会员'})
    async addMember(@Body() body: {email: string}) {
        const res = await EmailHelper.sendEmail('haokang2000@163.com', '欢迎您加入nestjs商城', 'nestjs-typegoose-mall欢迎你的加入!');
        return res;
    }
}