/*
* @Descripttion: 
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-06 11:35:44
*/
import { AccessService } from '@libs/sv/sys/access/access.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddAccessDto, DelAccessDto, FindAccessDto, UpAccessDto } from './dto/access.dto';


@ApiTags('资源')
@ApiBearerAuth()
@Controller(`${(new ConfigService).get('ADMIN_PATH')}/access`)
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