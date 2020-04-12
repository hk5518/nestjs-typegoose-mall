/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-22 14:40:56
 */
import { compare, hashSync } from 'bcryptjs';

export class PasswordHelper {

    /**
     * 加密字符串
     * @param password  加密的字符串
     */
    static hashPassword(password: string): string {
        return hashSync(password, parseInt(process.env.PASSWORD_SALT));
    }

    /**
     * 比较密码
     * @param password 原密码
     * @param hash 加密后的密码
     */
    static async comparePassword(password: string, hash: string):Promise<boolean> {
        return await compare(password, hash);
    }
}
