/*
* @Descripttion: 角色DTO
* @version: 1.0
* @Author: hk5518
* @Date: 2020-03-05 14:31:58
*/
import { EnumDataType } from '@libs/common/enum/std.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Length } from 'class-validator';

// 添加角色DTO
export class AddRoleDto {
    @ApiProperty({description: '角色名称'})
    @IsNotEmpty({message: '角色名称不能为空！'})
    @Length(3, 20, {message: '角色名称的长度必须在3-20字符之间'})
    title: string

    @ApiProperty({description: '角色描述', required: false})
    description?: string
}


// 更新角色DTO
export class UpRoleDto {
    @ApiProperty({description: '角色编号'})
    @IsNotEmpty({message: '角色编号不能为空！'})
    _id: string

    @ApiProperty({description: '角色名称'})
    @IsNotEmpty({message: '角色名称不能为空！'})
    @Length(3, 20, {message: '角色名称的长度必须在3-20字符之间'})
    title: string

    @ApiProperty({description: '角色描述', required: false})
    description?: string
}

// 删除角色DTO
export class DelRoleDto {
    @ApiProperty({description: '角色编号'})
    @IsNotEmpty({message: '角色编号不能为空！'})
    _id: string
}

// 添加角色资源DTO
export class AddRoleAccessDto {
    @ApiProperty({description: '角色编号'})
    @IsNotEmpty({message: '角色编号不能为空！'})
    role_id: string

    @ApiProperty({description: '全选资源编号'})
    @IsNotEmpty({message: '全选资源编号不能为空！'})
    access_ids: string
}

// 查询所有角色DTO
export class FindRolesDto {
    @ApiProperty({description: '关键词', required: false})
    keyword: string
}

// 根据角色编号资源DTO
export class FindAccessByRoleIdDto {
    @ApiProperty({description: '角色编号'})
    @IsNotEmpty({message: '角色编号不能为空！'})
    _id: string

    @ApiProperty({description: '数据形式：list | tree', required: false})
    @IsEnum(EnumDataType, {message: '数据形式不是有效的枚举值！'})
    type: string
}

// 批量删除角色资源关系
export class DelManyAccessDto {
    @ApiProperty({description: '角色编号'})
    @IsNotEmpty({message: '角色编号不能为空！'})
    role_id: string

    @ApiProperty({description: '资源编号组'})
    @IsNotEmpty({message: '资源编号组不能为空！'})
    access_ids: string
}

