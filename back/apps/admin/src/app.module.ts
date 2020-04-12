/*
* @Descripttion: app模块
* @version: 1.0
* @Author: hk5518
* @Date: 2020-02-20 17:29:35
*/
import { SvModule } from '@libs/sv';
import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { GoodsController } from './goods/goods.controller';
import { GoodsAttrTplController } from './goods/goods_attr_tpl.controller';
import { GoodsBrandController } from './goods/goods_brand.controller';
import { GoodsCateController } from './goods/goods_cate.controller';
import { AccessController } from './sys/access/access.controller';
import { RoleController } from './sys/role/role.conroller';
import { SettingController } from './sys/setting/setting.controller';
import { UserController } from './sys/user/user.controller';
import { UploadController } from './upload/upload.controller';


@Module({
  imports: [
    SvModule
  ],
  controllers: [
    SettingController,
    UserController,
    AuthController,
    RoleController,
    AccessController,
    GoodsController,
    GoodsCateController,
    GoodsAttrTplController,
    GoodsBrandController,
    UploadController
  ],
  exports: [SvModule]
})
export class AppModule {}
