/*
* @Descripttion: admin应用入口
* @version: 1.0
* @Author: hk5518
* @Date: 2020-02-20 17:29:35
*/
import { ErrorValidationPipe, HttpExceptionFilter, ReturnTransformInterceptor } from '@libs/common';
import { AuthJwtGuard } from '@libs/common/guards/auth.jwt.guard';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 获取配置服务
  const configService = app.get(ConfigService);

  // 给请求添加前缀
  app.setGlobalPrefix(configService.get('PREFIX'));

  // 开启全局http请求参数的管道验证
  app.useGlobalPipes(new ErrorValidationPipe());

  // 全局http异常错误处理
  app.useGlobalFilters(new HttpExceptionFilter());

  // 开启http响应数据格式拦截
  app.useGlobalInterceptors(new ReturnTransformInterceptor());

  // 开启全局请求的jwt验证
  app.useGlobalGuards(new AuthJwtGuard());

  // 设置静态文件目录
  app.useStaticAssets(join(__dirname, '../../../', configService.get('STATIC_PREFIX_PATH')))

  // 配置cookie中间件
  app.use(cookieParser('hk5518 cookies'));

  // 配置session的中间件
  app.use(session({
    secret: 'hk5518',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30, httpOnly:true },
    rolling: true
  }));

  // bodyParser配置
  app.use(bodyParser.json({ limit: configService.get('HTTP_BODY_LIMIT')}));
  app.use(
    bodyParser.urlencoded({
      limit: configService.get('HTTP_BODY_LIMIT'),
      extended: true,
      parameterLimit: 50000,
    }),
  );

  // 防止跨站点请求伪造(CSRF 或 XSRF)
  // app.use(csurf({cookie: true}));

  // 访问频次限制
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 100, // 限制15分钟内只能访问100次
    })
  )

  // 设置web漏洞，主要防止xss攻击
  app.use(helmet());

  // 压缩响应主体大小，提高加载速度
  app.use(compression());

  // 开启swagger文档配置
  const options = new DocumentBuilder()
    .setTitle('nestjs')
    .setDescription('nestjs-typegoose应用')
    .setVersion('1.0')
    .addBearerAuth({type: 'apiKey', name: 'token', in: 'header'})
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${configService.get('PREFIX')}/docs`, app, document);

  // 开启应用监听
  await app.listen(configService.get('ADMIN_PORT'));
  Logger.log(`服务已启动，请访问：${await app.getUrl()}`);
}

bootstrap();
