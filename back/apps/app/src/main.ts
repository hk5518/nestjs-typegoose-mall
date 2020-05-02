/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-05-02 11:18:49
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7002);
}
bootstrap();
