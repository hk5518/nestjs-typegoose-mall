/*
 * @Descripttion: 数据处理
 * @version: 1.0
 * @Author: hk5518
 * @Date: 2020-03-08 17:12:21
 */
export class JsonHelper {

    /**
     * 平级数据转换成tree数据
     * @param {*} source 源数据
     * @param {string} id 编号
     * @param {string} parentId 父编号
     * @param {string} children 子节点名称
     * @returns
     * @memberof JsonHelper
     */
    static treeTransformData(source: any, id: string, parentId: string, children: string) {
        const cloneData = JSON.parse(JSON.stringify(source))
        return cloneData.filter((father: any) => {
            const branchArr = cloneData.filter((child: any) => {
                if(!child.children) {
                    child[children] = [];
                }
                return father[id] === child[parentId]
            });
            branchArr.length > 0 ? father[children] = branchArr : '';
            return father[parentId] == 0;     // 如果第一层不是parentId=0，请自行修改
        })
    }
}