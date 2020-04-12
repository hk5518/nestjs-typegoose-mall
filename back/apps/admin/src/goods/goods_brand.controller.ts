
/*
* @Descripttion: 品牌控制器
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-24 11:09:37
*/
import { GoodsBrandService } from '@libs/sv/goods/goods_brand/goods_brand.service';
import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('商品品牌')
@ApiBearerAuth()
@Controller(`${process.env.ADMIN_PATH}/goodsBrand`)
export class GoodsBrandController {
    constructor(
        private readonly goodsBrandService: GoodsBrandService
    ) {}

    @ApiOperation({summary: '查询所有品牌'})
    @Get('findGoodsBrand')
    async findGoodsBrand() {
        return await this.goodsBrandService.findGoodBrand();
    }
}