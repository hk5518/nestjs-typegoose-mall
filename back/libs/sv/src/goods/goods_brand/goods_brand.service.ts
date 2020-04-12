/*
* @Descripttion: 商品品牌服务
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-24 11:05:54
*/
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class GoodsBrandService {
    constructor(
        @InjectModel('GoodsBrandModel') private readonly goodsBrandModel: ModelType<Document>
    ) {}

    async findGoodBrand() {
        return await this.goodsBrandModel.find({});
    }
}