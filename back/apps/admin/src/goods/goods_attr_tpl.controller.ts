/*
* @Descripttion: 商品属性控制器
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-13 15:13:28
*/
import { GoodsAttrTplService } from '@libs/sv/goods/goods_attr_tpl/goods_attr_tpl.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddGoodsAttrDto, DelGoodsAttrDto, UpGoodsAttrDto, UpGoodsAttrValDto } from './dto/goods_attr.dto';

@ApiTags('商品属性')
@ApiBearerAuth()
@Controller(`${(new ConfigService).get('ADMIN_PATH')}/goodsAttrTpl`)
export class GoodsAttrTplController {
    constructor(
        private readonly goodsAttrTplService: GoodsAttrTplService
    ) {}

    @ApiOperation({summary: '查询商品属性'})
    @Get('findGoodsAttrTpl')
    async qryGoodsType(@Query('goods_cate_id') goods_cate_id: string, @Query('type') type?: number) {
        return await this.goodsAttrTplService.findGoodsAttrTpl(goods_cate_id, type);
    }

    @ApiOperation({summary: '添加商品属性'})
    @Post('addGoodsAttrTpl')
    async addGoodsAttr(@Body() body: AddGoodsAttrDto) {
        return this.goodsAttrTplService.addGoodsAttrTpl(body.name, body.type, body.goods_cate_id);
    }

    @ApiOperation({summary: '修改商品属性'})
    @Post('upGoodsAttrTpl')
    async upGoodsAttrTpl(@Body() body: UpGoodsAttrDto) {
        return this.goodsAttrTplService.upGoodsAttrTpl(body.id, body.name, body.type, body.goods_cate_id);
    }

    @ApiOperation({summary: '修改商品属性值'})
    @Post('upGoodsAttrTplVal')
    async upGoodsAttrTplVal(@Body() body: UpGoodsAttrValDto) {
        return this.goodsAttrTplService.upGoodsAttrTplVal(body.id, body.attr_vals);
    }

    @ApiOperation({summary: '删除商品属性'})
    @Post('delGoodsAttrTpl')
    async delGoodsAttrTpl(@Body() body: DelGoodsAttrDto) {
        return this.goodsAttrTplService.delGoodsAttrTpl(body.id);
    }
}