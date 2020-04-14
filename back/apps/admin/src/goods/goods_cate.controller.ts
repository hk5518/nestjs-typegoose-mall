/*
* @Descripttion: 商品分类控制器
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-14 15:49:11
*/

import { GoodsCateService } from '@libs/sv/goods/goods_cate/goods_cate.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddGoodsCateDto, DelGoodsCateDto, UpGoodsCateDto, UpGoodsCateStatusDto } from './dto/goods_cate.dto';

@ApiTags('商品分类')
@ApiBearerAuth()
@Controller(`${(new ConfigService).get('ADMIN_PATH')}/goodsCate`)
export class GoodsCateController {
    constructor(private readonly goodsCateService: GoodsCateService) {}

    @ApiOperation({summary: '查询商品分类'})
    @Get('findGoodsCate')
    async findGoodsCate(@Query('type') type: string) {
        return this.goodsCateService.findGoodsCate(type);
    }

    @ApiOperation({summary: '添加商品分类'})
    @Post('addGoodsCate')
    async addGoodsCate(@Body() body: AddGoodsCateDto) {
        return await this.goodsCateService.addGoodsCate(body.name, body.pid, body.level, body.icon);
    }

    @ApiOperation({summary: '修改商品分类'})
    @Post('upGoodsCate')
    async upGoodsCate(@Body() body: UpGoodsCateDto) {
        return await this.goodsCateService.upGoodsCate(body.id, body.name, body.pid, body.level, body.icon);
    }

    @ApiOperation({summary: '更新商品分类状态码'})
    @Post('upGoodsCateStatus')
    async upGoodsCateStatus(@Body() body: UpGoodsCateStatusDto) {
        return this.goodsCateService.upGoodsCateStatus(body.id, body.status);
    }

    @ApiOperation({summary: '删除商品分类'})
    @Post('delGoodsCate')
    async delGoodsCate(@Body() body: DelGoodsCateDto) {
        return this.goodsCateService.delGoodsCate(body.id);
    }
}