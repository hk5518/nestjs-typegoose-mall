/*
* @Descripttion: 商品控制器
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-25 20:28:36
*/
import { GoodsService } from '@libs/sv/goods/goods/goods.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddGoodsDto, LoadGoodsBySnDto, QryGoodsDto, UpGoodsDto, UpGoodsIsBestDto, UpGoodsIsHotDto, UpGoodsIsNewDto, UpGoodsStatusDto } from './dto/goods.dto';

@ApiTags('商品')
@ApiBearerAuth()
@Controller(`${(new ConfigService).get('ADMIN_PATH')}/goods`)
export class GoodsController {
    constructor(
        private readonly goodsService: GoodsService
    ) {}

    @ApiOperation({summary: '查询商品'})
    @Get('qryGoods')
    async qryGoods(@Query() query: QryGoodsDto) {
        return await this.goodsService.qryGoods(query.keyword, Number(query.page), Number(query.size));
    }

    @ApiOperation({summary: '加载商品详情'})
    @Get('loadGoodsBySn')
    async loadGoodsBySn(@Query() query: LoadGoodsBySnDto) {
        return await this.goodsService.loadGoodsBySn(query.sn);
    }

    @ApiOperation({summary: '添加商品'})
    @Post('addGoods')
    async addGoods(@Body() body: AddGoodsDto) {
        return await this.goodsService.addGoods(body.name, body.price, body.weight, body.amount, body.goods_cate, body.goods_brand_id, body.is_sale, body.sale_attr, body.basic_attr, body.goods_sku, body.sub_name, body.content, body.pic);
    }

    @ApiOperation({summary: '修改商品'})
    @Post('upGoods')
    async upGoods(@Body() body: UpGoodsDto) {
        return await this.goodsService.upGoods(body.sn, body.name, body.price, body.weight, body.amount, body.goods_cate, body.goods_brand_id, body.is_sale, body.sale_attr, body.basic_attr, body.goods_sku, body.sub_name, body.content, body.pic);
    }

    @ApiOperation({summary: '修改商品状态'})
    @Post('upGoodsStatus')
    async upGoodsStatus(@Body() body: UpGoodsStatusDto) {
        return await this.goodsService.upGoodsStatus(body.sn, body.status);
    }

    @ApiOperation({summary: '修改商品是否热销'})
    @Post('upGoodsIsHot')
    async upGoodsIsHot(@Body() body: UpGoodsIsHotDto) {
        return await this.goodsService.upGoodsIsHot(body.sn, body.is_hot);
    }

    @ApiOperation({summary: '修改商品是否精品'})
    @Post('upGoodsIsBest')
    async upGoodsIsBest(@Body() body: UpGoodsIsBestDto) {
        return await this.goodsService.upGoodsIsBest(body.sn, body.is_best);
    }

    @ApiOperation({summary: '修改商品是否新品'})
    @Post('upGoodsIsNew')
    async upGoodsIsNew(@Body() body: UpGoodsIsNewDto) {
        return await this.goodsService.upGoodsIsNew(body.sn, body.is_new);
    }
}