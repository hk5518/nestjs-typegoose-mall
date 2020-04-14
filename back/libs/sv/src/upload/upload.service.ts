/*
 * @Descripttion: 图像上传服务
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-30 15:40:51
 */
import { ApiException } from '@libs/common/exception/api.exception';
import { ImageHelper } from '@libs/common/helper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

@Injectable()
export class UploadService {
    constructor(
        private readonly configService: ConfigService
    ) {}
    /**
     * 上传图片
     *
     * @param {any} file 图片地址
     * @memberof UploadService
     */
    async uploadPic(file: any) {
        // 判断文件是否存在
        if(!file) {
            throw new ApiException('上传文件不存在！')
        }
        // 判断文件类型是否合法
        const ext = extname(file.originalname);
        const imageExt = ['.jpg', '.jpeg', '.png',  '.gif', '.bmp'];
        if (!imageExt.includes(ext.toLocaleLowerCase())) {
            throw new ApiException(`文件类型不合法，只支持${imageExt.join(' ')}`)
        }

        // 判断文件大小
        if(file.size > 2 * 1024 * 1024) {
            throw new ApiException('文件大小最大为2MB！')
        }

        // 上传图片
        const uploadRes = await ImageHelper.uploadFile(file);
        const saveDir = uploadRes.saveDir;
        const uploadDir = uploadRes.uploadDir;

        // 生成缩略图
        if (uploadDir) {
            ImageHelper.jimpImage(uploadDir);
        }
        return {
            path: saveDir,
            fullpath: `${this.configService.get('IMAGE_HOST')}/static/${this.configService.get('UPLOAD_DIR')}/${saveDir}`
        }
    }
}