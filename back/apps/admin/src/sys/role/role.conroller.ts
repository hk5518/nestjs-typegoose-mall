/*
* @Descripttion: 角色控制器
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-04 16:01:29
*/
import { EnumDataType } from '@libs/common/enum/std.enum';
import { AccessService } from '@libs/sv/sys/access/access.service';
import { RoleService } from '@libs/sv/sys/role/role.service';
import { RoleAccessService } from '@libs/sv/sys/role_access/role_access.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddRoleAccessDto, AddRoleDto, DelManyAccessDto, DelRoleDto, FindAccessByRoleIdDto, FindRolesDto, UpRoleDto } from './dto/role.dto';


@ApiTags('角色')
@ApiBearerAuth()
@Controller(`${process.env.ADMIN_PATH}/role`)
export class RoleController {

    constructor(
        private readonly roleService: RoleService,
        private readonly roleAccessService: RoleAccessService,
        private readonly accessService: AccessService,
    ) {}

    @ApiOperation({summary: '加载所有角色'})
    @Get('findRoles')
    async findRoles(@Query() query: FindRolesDto) {
        return await this.roleService.findRoles(query.keyword);
    }

    @ApiOperation({summary: '添加角色'})
    @Post('addRole')
    async addRole(@Body() body: AddRoleDto) {
        return this.roleService.addRole(body.title, body.description);
    }

    @ApiOperation({summary: '更新角色'})
    @Post('upRole')
    async upRole(@Body() body: UpRoleDto) {
        return this.roleService.upRole(body._id, body.title, body.description);
    }

    @ApiOperation({summary: '删除角色'})
    @Post('delRole')
    async delRole(@Body() body: DelRoleDto) {
        return this.roleService.delRole(body._id);
    }

    @ApiOperation({summary: '添加角色资源'})
    @Post('addRoleAccess')
    async addRoleAccess(@Body() body: AddRoleAccessDto) {
        return await this.roleAccessService.addRoleAccess(body.role_id, body.access_ids);
    }

    @ApiOperation({summary: '根据角色编号查询其关联的资源'})
    @Get('findAccessByRoleId')
    async findAccessByRoleId(@Query() query: FindAccessByRoleIdDto) {
        return this.roleService.findAccessByRoleId(query._id, query.type);
    }

    @ApiOperation({summary: '批量删除角色关联资源，并返回角色下的最新资源'})
    @Post('delManyAccess')
    async delManyAccess(@Body() body: DelManyAccessDto) {
        await this.roleAccessService.delManyAccess(body.access_ids);
        return await this.roleService.findAccessByRoleId(body.role_id, EnumDataType.TREE);
    }
}