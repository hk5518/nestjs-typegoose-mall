/*
* @Descripttion: 服务模块
* @version: 1.0
* @Author: hk5518
* @Date: 2020-02-21 16:17:28
*/
import { Config } from '@libs/common/config';
import { JwtStrategy } from '@libs/common/strategy/jwt.strategy';
import { LocalStrategy } from '@libs/common/strategy/local.strategy';
import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { ChatService } from './chat/chat.service';
import { ChatModel } from './chat/model/chat.model';
import { EventsGateway } from './events/events.gateway';
import { GoodsService } from './goods/goods/goods.service';
import { GoodsModel } from './goods/goods/model/goods.model';
import { GoodsAttrTplService } from './goods/goods_attr_tpl/goods_attr_tpl.service';
import { GoodsAttrTplModel } from './goods/goods_attr_tpl/model/goods_attr_tpl.model';
import { GoodsBrandService } from './goods/goods_brand/goods_brand.service';
import { GoodsBrandModel } from './goods/goods_brand/model/goods_brand.model';
import { GoodsCateService } from './goods/goods_cate/goods_cate.service';
import { GoodsCateModel } from './goods/goods_cate/model/goods_cate.model';
import { GoodsDescModel } from './goods/goods_desc/model/goods_desc.model';
import { GoodsSkuService } from './goods/goods_sku/goods_sku.service';
import { GoodsSkuModel } from './goods/goods_sku/model/goods_sku.model';
import { MemberService } from './member/member/member.service';
import { MemberModel } from './member/member/model/member.model';
import { AccessService } from './sys/access/access.service';
import { AccessModel } from './sys/access/model/access.model';
import { RoleModel } from './sys/role/model/role.model';
import { RoleService } from './sys/role/role.service';
import { RoleAccessModel } from './sys/role_access/model/role_access.model';
import { RoleAccessService } from './sys/role_access/role_access.service';
import { SettingModel } from './sys/setting/model/setting.model';
import { SettingService } from './sys/setting/setting.service';
import { UserModel } from './sys/user/model/user.model';
import { UserService } from './sys/user/user.service';
import { UploadService } from './upload/upload.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      expandVariables: true,
      envFilePath: Config.envFilePath
    }),
    DbModule,
    TypegooseModule.forFeature([
      {typegooseClass: ChatModel, schemaOptions: {collection: 'chat'}},
      {typegooseClass: MemberModel, schemaOptions: {collection: 'member'}},
      {typegooseClass: SettingModel, schemaOptions: {collection: 'setting'}},
      {typegooseClass: UserModel, schemaOptions: {collection: 'user'}},
      {typegooseClass: RoleModel, schemaOptions: {collection: 'role'}},
      {typegooseClass: AccessModel, schemaOptions: {collection: 'access'}},
      {typegooseClass: RoleAccessModel, schemaOptions: {collection: 'role_access'}},
      {typegooseClass: GoodsModel, schemaOptions: {collection: 'goods'}},
      {typegooseClass: GoodsDescModel, schemaOptions: {collection: 'goods_desc'}},
      {typegooseClass: GoodsSkuModel, schemaOptions: {collection: 'goods_sku'}},
      {typegooseClass: GoodsCateModel, schemaOptions: {collection: 'goods_cate'}},
      {typegooseClass: GoodsAttrTplModel, schemaOptions: {collection: 'goods_attr_tpl'}},
      {typegooseClass: GoodsBrandModel, schemaOptions: {collection: 'goods_brand'}},
    ]),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: (new ConfigService).get('JWT_SECRET'),
          SignOptions: {
            expiresIn: 60000
          }
        }
      }
    })
  ],
  providers: [EventsGateway, LocalStrategy, JwtStrategy, UploadService, ChatService, MemberService, SettingService, UserService, RoleService, AccessService, RoleAccessService, GoodsService, GoodsSkuService, GoodsCateService, GoodsAttrTplService, GoodsBrandService],
  exports: [EventsGateway, LocalStrategy, JwtStrategy, JwtModule, UploadService, ChatService, MemberService, SettingService, UserService, RoleService, AccessService, RoleAccessService, GoodsService, GoodsSkuService, GoodsCateService, GoodsAttrTplService, GoodsBrandService],
})
export class SvModule {}
