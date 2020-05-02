/*
 * @Descripttion: 接口类型
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-05-02 14:49:20
 */
import { mongoose } from "@typegoose/typegoose";

export type ObjectId = mongoose.Schema.Types.ObjectId;
export type AccessPid = mongoose.Schema.Types.ObjectId | 0;
export type Array = mongoose.Schema.Types.Array;
export type Map = mongoose.Schema.Types.Map;