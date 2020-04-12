/*
* @Descripttion: 
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-06 11:35:44
*/
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { AccessService } from '@libs/sv/sys/access/access.service';
import { AddAccessDto, UpAccessDto, DelAccessDto, FindAccessDto } from './dto/access.dto';

@ApiTags('资源')
@ApiBearerAuth()
@Controller(`${process.env.ADMIN_PATH}/access`)
export class AccessController {
    constructor(private readonly accessService: AccessService) {}

    @ApiOperation({summary: '获取所有资源'})
    @Get('findAccess')
    async findAccess(@Query() query: FindAccessDto) {
        return await this.accessService.findAccess(query.type);
    }

    @ApiOperation({summary: '添加资源'})
    @Post('addAccess')
    async addAccess(@Body() body: AddAccessDto) {
        return this.accessService.addAccess(body.name, body.type, body.pid, body.url, body.icon, body.sort, body.description);
    }

    @ApiOperation({summary: '更新资源'})
    @Post('upAccess')
    async upAccess(@Body() body: UpAccessDto) {
        return await this.accessService.upAccess(body._id, body.name, body.type, body.pid, body.url, body.icon, body.sort, body.description)
    }

    @ApiOperation({summary: '删除资源'})
    @Post('delAccess')
    async delAccess(@Body() body: DelAccessDto) {
        return this.accessService.delAccess(body._id);
    }
}