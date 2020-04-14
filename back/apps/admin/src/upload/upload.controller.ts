/*
* @Descripttion: 上传图片控制器
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-30 15:10:38
*/
import { UploadService } from '@libs/sv/upload/upload.service';
import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { extname, join } from 'path';
import multer = require('multer');
import dayjs = require('dayjs');
import mkdirp = require('mkdirp');

@Controller(`${(new ConfigService).get('ADMIN_PATH')}/upload`)
@ApiTags('文件上传')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService
    ) { }    
    @ApiOperation({description: '上传单个图片'})
    @Post('uploadPic')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPic(@UploadedFile() file: any) {
        return await this.uploadService.uploadPic(file);
    }

    /**
     * 图片上传2：上传批量图片，一次性接受图片数组
     *
     * @param {*} files 图片数组
     * @returns
     * @memberof UploadController
     */
    @ApiOperation({description: '上传批量图片'})
    @Post('uploadPics')
    @UseInterceptors(FilesInterceptor('files', 2, {
        dest: 'public/static/upload/'+ dayjs().format('YYYYMMDD'),
        storage: multer.diskStorage({
            destination(req, file, cb) {
                let day = dayjs().format('YYYYMMDD');
                let dir = join(__dirname, '../../../', `public/static/upload`, day);
                mkdirp.sync(dir);
                cb(null, dir);
            },
            filename(req, file, cb) {
                let day = dayjs().format('YYYYMMDD');
                let timestamp = new Date().getTime();
                cb(null, timestamp + extname(file.originalname))
            }
        })
    }))
    async uploadPics(@UploadedFiles() files: any) {
        return files;
    }

    /**
     * 图片上传1：上传批量图片，接受多个文件名
     *
     * @param {*} files 
     * @returns
     * @memberof UploadController
     */
    @ApiOperation({description: '上传批量图片，接受多个文件名'})
    @Post('uploadPics2')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'pic1', maxCount: 1},
        {name: 'pic2', maxCount: 1},
    ]))
    async uploadPics2(@UploadedFiles() files: any) {
        return files;
    }
}