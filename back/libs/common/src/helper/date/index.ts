/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-22 14:40:56
 */
import * as dayjs from 'dayjs';

export class DateHelper {
    /**
     * 格式化日期
     * @param date 日期对象
     * @param type  格式化类型
     */
    static formatDate(date: any, type: string = 'YYYY-MM-DD HH:mm:ss') {

        return dayjs(date).format(type);
    }

}