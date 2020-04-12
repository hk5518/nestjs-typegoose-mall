/*
 * @Descripttion: 字符串辅助类
 * @version: 1.0
 * @Author: hk55181
 * @Date: 2020-02-22 20:53:19
 */
export class StrHelper {

    /**
     * 截取字符串
     * @param str 字符串
     * @param start 开始位置
     * @param end 结束位置
     */
    static substring(str: string, start: number, end: number) {

        if (end) {
            return str.substring(start, end);
        } else {
            return str.substring(start);
        }
    }

    /**
     * 去除字符串左右的空格
     *
     * @static
     * @param {string} str 字符串
     * @returns
     * @memberof StrHelper
     */
    static trim(str: string) {
        return str ? str.replace(/(^\s*)|(\s*$)/g, '') : ''
    }
}