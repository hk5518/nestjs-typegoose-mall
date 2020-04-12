/*
 * @Descripttion: jwt验证策略
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-02-25 15:24:15
 */
import { UserService } from '@libs/sv/sys/user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 默认获取header中的Authorization
            jwtFromRequest: ExtractJwt.fromHeader(process.env.JWT_EXTRACT_HEADER),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false
        } as StrategyOptions)
    }

    async validate(id: string) {
        const user = await this.userService.loadUserById(id);
        return user;
    }
}