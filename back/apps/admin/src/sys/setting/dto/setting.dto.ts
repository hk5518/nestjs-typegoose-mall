
/*
* @Descripttion: 设置dto
* @version: 1.0
* @Author: hk5518
* @Date: 2020-04-01 16:13:25
*/

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpSettingDto {
    @ApiProperty({description: '站点标题'})
    @IsNotEmpty({message: '站点标题不能为空！'})
    title: string

    @ApiProperty({description: '站点联系人'})
    @IsNotEmpty({message: '站点联系人不能为空！'})
    linkman: string

    @ApiProperty({description: '站点手机号'})
    @IsNotEmpty({message: '站点手机号不能为空！'})
    phone: number

    @ApiProperty({description: '站点设置编码', required: false})
    id?: string

    @ApiProperty({description: '站点logo', required: false})
    logo?: string

    @ApiProperty({description: '站点关键词', required: false})
    keywords?: string

    @ApiProperty({description: '站点描述', required: false})
    description?: string

    @ApiProperty({description: 'icp备案号', required: false})
    icp?: string

    @ApiProperty({description: '统计码', required: false})
    code?: string
}