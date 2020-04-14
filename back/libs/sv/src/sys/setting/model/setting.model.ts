/*
 * @Descripttion: 站点设置模型
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-04-01 15:28:54
 */
import { ConfigService } from '@nestjs/config';
import { modelOptions, prop, Typegoose } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {virtuals: true}
    }
})
export class SettingModel extends Typegoose {

    @prop()
    title: string // 站点标题

    @prop()
    logo: string // 站点logo

    @prop()
    keyword: string // 站点关键词

    @prop()
    description: string // 站点描述

    @prop()
    icp: string // 站点icp备案号

    @prop()
    linkman: string // 站点联系人

    @prop()
    phone: number // 站点手机号

    @prop()
    code: string // 统计码

    // 返回带域名的logo地址
    get fulllogo(): any {
        if (this.logo) {
            const url = `${(new ConfigService).get('IMAGE_HOST')}/static/${(new ConfigService).get('UPLOAD_DIR')}/${this.logo}`
            return {
                url
            }
        } else {
            return ''
        }
    }

}