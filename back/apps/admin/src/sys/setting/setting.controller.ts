/*
* @Descripttion:
* @version: 1.0
* @Author: hk5518
* @Date: 2020-04-01 16:10:40
*/
import { SettingService } from '@libs/sv/sys/setting/setting.service';
import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpSettingDto } from './dto/setting.dto';

@ApiTags('站点设置')
@ApiBearerAuth()
@Controller(`${process.env.ADMIN_PATH}/setting`)
export class SettingController {
    constructor(
        private readonly settingService: SettingService
    ) {}

    @Get('loadSetting')
    loadSetting() {
        return this.settingService.loadSetting();
    }

    @Post('upSetting')
    @UseInterceptors(FileInterceptor('logo'))
    upSetting(@Body() body: UpSettingDto, @UploadedFile() logo: any) {
        return this.settingService.upSetting(logo, body);
    }
}