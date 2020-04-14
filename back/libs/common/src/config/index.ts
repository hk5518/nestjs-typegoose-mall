/*
 * @Descripttion: 配置文件
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-02-22 20:42:15
 */
export const Config = {
    // development: 开发环境；production: 生产环境
    envFilePath: 'env/production.env',
    // 控制器白名单
    whiteCtrlList: [
        `/v1/admin/auth/login`,
        `/v1/admin/auth/captcha`,
    ],
    jimpSize: [{ width: 100, height: 100 }, { width: 200, height: 200 }, {width: 400, height: 400 }]
}

