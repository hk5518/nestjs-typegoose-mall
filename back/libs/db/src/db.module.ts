/*
 * @Descripttion: 数据库模块
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-02-21 14:31:02
 */
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: (new ConfigService).get('MONGO_URL'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      }
    })
  ]
})
export class DbModule {}
