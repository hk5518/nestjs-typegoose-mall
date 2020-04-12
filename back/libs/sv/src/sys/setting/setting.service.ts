/*
* @Descripttion: 站点设置模型
* @version: 1.0
* @Author: hk5518
* @Date: 2020-04-01 16:02:10
*/
import { ApiException } from '@libs/common/exception/api.exception';
import { UploadService } from '@libs/sv/upload/upload.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { UpSettingDto } from 'apps/admin/src/sys/setting/dto/setting.dto';
import { Types } from 'mongoose';
import { SettingModel } from './model/setting.model';

@Injectable()
export class SettingService {
    constructor(
        @InjectModel('SettingModel') private readonly settingModel: ReturnModelType<typeof SettingModel>,
        private readonly uploadService: UploadService
    ) {}

    /**
     * 根据编码加载站点设置
     *
     * @returns
     * @memberof SettingService
     */
    async loadSetting() {
        const id: string = '5e8456ad99b4e609ccac25ba';
        return this.settingModel.findById(id);
    }

    /**
     * 更新站点设置
     *
     * @param {*} logo logo文件流
     * @param {UpSettingDto} json json数据
     * @returns {Promise<any>}
     * @memberof SettingService
     */
    async upSetting(logo: any, json: UpSettingDto): Promise<any> {
        try {
            // 判断logo是否存在
            if (logo) {
                const { path } = await this.uploadService.uploadPic(logo);
                json.logo = path;
            }

            if (json && json.id) {
                // 更新设置
                return await this.settingModel.updateOne({_id: Types.ObjectId(json.id)}, json);
            } else {
                // 添加设置
                const setting = await this.settingModel.create(json);
                return await setting.save();
            }
        } catch (error) {
            throw new ApiException(error);
        }
    }
}