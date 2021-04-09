const resources=[
    { resourceId: 1, resourceName: "立项文档", authorId: '234', userName: '赵浩', resourceCreateTime: '2020-03-22 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 0, resourceIsDeleted: false },
    { resourceId: 2, resourceName: "项目计划", authorId: '41514', userName: '钱全有', resourceCreateTime: '2020-03-25 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 1, resourceIsDeleted: false },
    { resourceId: 3, resourceName: "需求文档", authorId: '12414', userName: '孙香', resourceCreateTime: '2020-04-01 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB',resourceReview: 2, resourceIsDeleted: false },
    { resourceId: 4, resourceName: "系统设计", authorId: '1242', userName: '李志鹏', resourceCreateTime: '2020-4-12 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 0, resourceIsDeleted: false },
    { resourceId: 5, resourceName: "源码", authorId: '2456', userName: '周欣', resourceCreateTime: '2020-04-22 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 1, resourceIsDeleted: false },
    { resourceId: 6, resourceName: "项目关闭总结报告", authorId: '12424', userName: '吴名', resourceCreateTime: '2020-05-01 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 2, resourceIsDeleted: false },
    { resourceId: 7, resourceName: "立项文档", authorId: '234', userName: '赵浩', resourceCreateTime: '2020-03-22 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 0, resourceIsDeleted: false },
    { resourceId: 8, resourceName: "项目计划", authorId: '41514', userName: '钱全有', resourceCreateTime: '2020-03-25 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 1, resourceIsDeleted: false },
    { resourceId: 9, resourceName: "需求文档", authorId: '12414', userName: '孙香', resourceCreateTime: '2020-04-01 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 2, resourceIsDeleted: false },
    { resourceId: 10, resourceName: "关于系统设计的一些自我感想", authorId: '1242', userName: '李志鹏', resourceCreateTime: '2020-4-12 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 0, resourceIsDeleted: false },
    { resourceId: 11, resourceName: "源码", authorId: '2456', userName: '周欣', resourceCreateTime: '2020-04-22 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 1, resourceIsDeleted: false },
]


export default {
    get_resources_suc:(param)=>{
        let prm = JSON.parse(param.body);
        let cp = prm.currentPage, ps = prm.pageSize;
        
        return {
            code: 200,
            msg: "查询成功",
            data: {
                resources: resources.slice((cp-1)*ps, cp*ps),
                totalNum: resources.length,
                pId: prm.pId
            }
        }
    },
    get_resources_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败，请稍后重试",
            data: { }
        }
    },
    assign_task_suc:(param)=>{
        return {
            code: 200,
            msg: "任务分配成功",
            data:{}
        }
    },
    assign_task_fai:(param)=>{
        return {
            code: 503,
            msg: "任务分配失败",
            data:{}
        }
    },
    edit_project_suc:(param)=>{
        return {
            code: 200,
            msg: "修改成功",
            data:{}
        }
    },
    edit_project_fai:(param)=>{
        return {
            code: 500,
            msg: "修改失败",
            data:{}
        }
    },
    delete_project_suc:(param)=>{
        return {
            code: 200,
            msg: "删除成功",
            data:{}
        }
    },
    delete_project_fai:(param)=>{
        return {
            code: 500,
            msg: "删除失败",
            data:{}
        }
    },
}