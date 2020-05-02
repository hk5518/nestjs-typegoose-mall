/*
* @Descripttion: 邮件发送类
* @version: 1.0
* @Author: hk5518
* @Date: 2020-05-01 16:40:02
*/
const nodemailer = require('nodemailer');
import { ConfigService } from '@nestjs/config';
import { ApiException } from '../../exception/api.exception';

export class EmailHelper {
    static configService: any = new ConfigService;
    static transporter: any =  nodemailer.createTransport({
        host: EmailHelper.configService.get('EMAIL_HOST'),
        port: EmailHelper.configService.get('EMAIL_PORT'),
        secure: true,
        auth: {
            user: EmailHelper.configService.get('EMAIL_USER'),
            pass: EmailHelper.configService.get('EMAIL_PASS')
        }
    })
    /**
     * 发送邮件
     *
     * @static
     * @param {string} email 邮箱
     * @param {string} title 标题
     * @param {string} content 内容
     * @returns
     * @memberof EmailHelper
     */
    static async sendEmail(email: string, title: string, content:string) {
        let options: any = {
            from: EmailHelper.configService.get('EMAIL_USER'),
            to: email,
            subject: title,
            html: content
        };
        try {
            await this.transporter.sendMail(options);
            return '发送成功！';
        } catch (error) {
            throw new ApiException(error);
        }
        
    }
}