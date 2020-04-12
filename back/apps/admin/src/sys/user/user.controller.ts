/*
* @Descripttion: 用户控制器
* @version: 1.0
* @Author: hk5518
* @Date: 2020-02-22 21:03:50
*/

import { Controller, Get, Req, Body, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from '@libs/sv/sys/user/user.service';
import { QueryUsersDto, AddUserDto, UpUserDto, upUserPasswordDto, upUserStatusDto, DelUserDto } from './dto/user.dto';

@ApiTags('用户')
@ApiBearerAuth()
@Controller(`${process.env.ADMIN_PATH}/user`)
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * 获取已登录的用户信息
     *
     * @param {*} req 请求对象
     * @returns 用户实体
     * @memberof UserController
     */
    @ApiOperation({summary: '获取已登录的用户信息'})
    @Get('loadLoginUser')
    async loadLoginUser(@Req() req: any) {
        const data = req.user || null;
        return data;
    }

    /**
     * 获取所有用户
     *
     * @param {QueryUsersDto} body 数据对象
     * @returns
     * @memberof UserController
     */
    @ApiOperation({summary: '获取所有用户'})
    @Get('qryUsers')
    async queryUsers(@Query() query: QueryUsersDto) {
        return await this.userService.qryUsers(query.keyword, Number(query.page), Number(query.size));
    }

    /**
     * 添加用户
     *
     * @param {AddUserDto} body 数据对象
     * @returns
     * @memberof UserController
     */
    @ApiOperation({summary: '添加用户'})
    @Post('addUser')
    async addUser(@Body() body: AddUserDto) {
        return this.userService.addUser(body.username, body.password, body.mobile, body.role_id, body.email);
    }

    /**
     * 更新用户
     *
     * @param {UpUserDto} body 数据对象
     * @returns
     * @memberof UserController
     */
    @ApiOperation({summary: '更新用户'})
    @Post('upUser')
    async upUser(@Body() body: UpUserDto) {
        return this.userService.upUser(body._id, body.mobile, body.role_id, body.email);
    }

    /**
     * 更新用户密码
     *
     * @param {upUserPasswordDto} body 数据对象
     * @returns
     * @memberof UserController
     */
    @ApiOperation({summary: '更新用户密码'})
    @Post('upUserPassword')
    async upUserPassword(@Body() body: upUserPasswordDto) {
        return this.userService.upUserPassword(body._id, body.old_password, body.new_password);
    }

    /**
     * 更新状态码
     *
     * @param {upUserStatusDto} body 数据对象
     * @returns
     * @memberof UserController
     */
    @ApiOperation({summary: '更新状态码'})
    @Post('upUserStatus')
    async upUserStatus(@Body() body: upUserStatusDto) {
        return this.userService.upUserStatus(body._id, body.status);
    }

    /**
     * 删除用户
     *
     * @param {DelUserDto} body 数据对象
     * @returns
     * @memberof UserController
     */
    @ApiOperation({summary: '删除用户'})
    @Post('delUser')
    async delUser(@Body() body: DelUserDto) {
        return await this.userService.delUser(body._id);
    }
}
