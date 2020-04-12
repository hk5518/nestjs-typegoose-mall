/*
 * @Descripttion: 用户密码的验证策略
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-02-24 16:25:51
 */
import { UserService } from '@libs/sv/sys/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        } as IStrategyOptions)
    }

    async validate(username: string, password: string) {
        const user = await this.userService.login(username, password);
        return user;
    }
}