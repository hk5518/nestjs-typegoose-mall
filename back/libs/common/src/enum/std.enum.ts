/*
 * @Descripttion: 枚举
 * @version: 1.0
 * @Author: hk55181
 * @Date: 2020-02-22 17:47:12
 */
// 请求码
export enum EnumHttpCode {
    SUCCESS = 0, // 操作成功
    FAIL = 1, // 操作失败
    NO_LOGIN = 2, // 未登录
    EXCEPTION = 3 // 发生异常
}

export enum EnumDataType {
    TREE = 'tree', // 树形结构
    LIST = 'list' // 列表形式
}

// 是否
export enum EnumYN {
    YES = 1, // 是
    NO = 0 // 否
}

// 资源节点类型
export enum EnumAccessType {
    MODULE =1, // 模块
    MENU = 2, // 菜单
    OPERATION = 3 // 操作
}

export enum EnumAttrType {
    SALE = 1, // 销售属性
    SPEC = 2, // 规格属性
    BRAND = 3 // 品牌属性
}

export enum EnumRelationType {
    GOOGS = 1, // 商品表
    SKU = 2 // SKU表
}

export enum EnumGoodsStatus {
    DOWN = 0, // 下架
    UP = 1, // 上架
    DEL = 2, // 删除
}

export enum EnumSex {
    NEUTRAL=0, // 中性
    FEMALE = 1, // 女
    MALE = 2, // 男
}