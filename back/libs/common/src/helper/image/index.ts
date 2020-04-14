/*
 * @Descripttion: 图像处理
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-06 10:02:58
 */
import { Config } from '@libs/common/config';
import { ConfigService } from '@nestjs/config';
import { createWriteStream } from 'fs';
import * as mkdirp from 'mkdirp';
import { extname, join } from 'path';
import * as svgCaptcha from 'svg-captcha';
import dayjs = require('dayjs');
import Jimp = require('jimp');

export class ImageHelper {
    static configService: any = new ConfigService;
    /**
     * 生成验证码
     * @param size 字符数量
     * @param width 图片宽度
     * @param height 图片高度
     */
    static genCaptcha(size: number = 4, width: number = 100, height: number = 30, fontSize: number = 50) {
        const captcha = svgCaptcha.create({
            size: size,
            fontSize: fontSize,
            width: width,
            height: height,
            background: '#cc9966'
        });
        return captcha;
    }

    /**
     * 生成图片路径地址
     * @param dir 路径
     * @param width 宽度
     * @param height 高度
     */
    static genImgPath(dir: string, width: number, height: number) { 
        height = height || width;
        return dir + '_' + width + 'x' + height + extname(dir); 
    }

    /**
     * 上传文件
     *
     * @static
     * @param {*} file 文件流
     * @returns {Promise<any>}
     * @memberof ImageHelper
     */
    static uploadFile(file: any): Promise<any> {
        return new Promise((resolve) => {
            if (file) {
                // 获取当前日期时间
                const day = dayjs().format('YYYYMMDD');
                const timestamp = new Date().getTime();

                // 根据日期创建目录
                const dir = join(__dirname, '../../../', `${this.configService.get('STATIC_PREFIX_PATH')}/static/${this.configService.get('UPLOAD_DIR')}`, day);
                mkdirp.sync(dir);
                const uploadDir = join(dir, timestamp + extname(file.originalname));

                // 上传写入文件
                const writeImage = createWriteStream(uploadDir);
                writeImage.write(file.buffer);
                writeImage.end();
                writeImage.on('finish', () => {
                    const saveDir = join(day, timestamp + extname(file.originalname));
                    resolve({
                        saveDir,
                        uploadDir
                    })
                })
            } else {
                resolve({
                    saveDir: '',
                    uploadDir: ''
                })
            }
        })
    }

    /**
     * 压缩图片，根据配置生成多种尺寸的图片
     *
     * @static
     * @param {string} file 图片地址
     * @memberof ImageHelper
     */
    static jimpImage(file: string) {
        Jimp.read(file, (err: any, lenna: any) => {
            if (err) {
                return false;
            };
            Config.jimpSize.forEach(item => {
                lenna
                    .resize(item.width, item.height)
                    .quality(100)
                    .write(`${file}_${item.width}x${item.height}${extname(file)}`);
            });
        })
    }
}