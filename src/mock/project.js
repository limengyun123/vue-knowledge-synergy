const resources=[
    {
        rId: 1,
        rName: "立项文档",
        rAuthorId: '234',
        rAuthorName: '赵浩',
        rUploadTime: '2020-03-22 12:45'
    },
    {
        rId: 2,
        rName: "项目计划",
        rAuthorId: '41514',
        rAuthorName: '钱全有',
        rUploadTime: '2020-03-25 12:45'
    },
    {
        rId: 3,
        rName: "需求文档",
        rAuthorId: '12414',
        rAuthorName: '孙香',
        rUploadTime: '2020-04-01 12:45'
    },
    {
        rId: 4,
        rName: "系统设计",
        rAuthorId: '1242',
        rAuthorName: '李志鹏',
        rUploadTime: '2020-4-12 12:45'
    },
    {
        rId: 5,
        rName: "源码",
        rAuthorId: '2456',
        rAuthorName: '周欣',
        rUploadTime: '2020-04-22 12:45'
    },
    {
        rId: 6,
        rName: "项目关闭总结报告",
        rAuthorId: '12424',
        rAuthorName: '吴名',
        rUploadTime: '2020-05-01 12:45'
    }
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