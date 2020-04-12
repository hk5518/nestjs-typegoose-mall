/*
* @Descripttion: 用户验证控制
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-01 19:41:59
*/
import { ApiException } from '@libs/common/exception/api.exception';
import { ImageHelper } from '@libs/common/helper';
import { UserService } from '@libs/sv/sys/user/user.service';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth.dto';



@Controller(`${process.env.ADMIN_PATH}/auth`)
@ApiTags('授权')
export class AuthController {

    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

    /**
     * 获取验证码
     *
     * @param {*} req 请求对象
     * @param {*} res 响应对象
     * @memberof AuthController
     */
    @Get('captcha')
    @ApiOperation({summary: '获取图形码'})
    async getCaptcha(@Req() req: any, @Res() res: any) {
        const svgCaptcha = ImageHelper.genCaptcha();
        req.session.code = svgCaptcha.text.toLocaleLowerCase();
        res.type('image/svg+xml');
        res.status(200).send(svgCaptcha.data);
    }

    /**
     * 用户登录
     *
     * @param {UserLoginDto} body 登录参数
     * @param {*} req 请求对象
     * @memberof AuthControllervv
     */
    @Post('login')
    @ApiOperation({summary: '用户登录'})
    async login(@Body() body: AuthLoginDto, @Req() req: any) {
        if (!body.code || body.code.toLocaleLowerCase() !== req.session.code) {throw new ApiException('验证码不正确！')}
        const user = await this.userService.login(body.username, body.password);
        const token = this.jwtService.sign(String(user._id));
        const {password, ...newUser} = JSON.parse(JSON.stringify(user));
        return {token, user: newUser};
    }

    @ApiOperation({summary: '用户登出'})
    @ApiBearerAuth()
    @Post('logout')
    async logout(@Req() req: any) {
        delete req.user;
        return null;
    }
}