const notices = [
    {id:1, content:"刘志强邀请您加入‘课程管理系统开发项目组’团队", createTime: '2021/03/30 14:24', status: false},
    {id:2, content:"李存芳接收了您的邀请，加入‘课程管理系统开发项目组’团队", createTime: '2021/03/30 14:24', status: false},
    {id:3, content:"刘志强在‘课程管理系统开发项目组’团队创建了项目‘课程管理系统’", createTime: '2021/03/30 14:24', status: false},
    {id:4, content:"刘志强评论了您的资源‘需求分析-李存芳’：挺好，不过参考文献格式稍微改改", createTime: '2021/03/30 14:24', status: false},
    {id:5, content:"刘志强回复了您的评论‘好的’：嗯，辛苦了！", createTime: '2021/03/30 14:24', status: false},
    {id:6, content:"刘志强在‘课程管理系统’项目中向您分配任务：‘完成数据库设计’", createTime: '2021/03/30 14:24', status: false},
    {id:7, content:"李存芳接收了您的任务‘完成任务书’", createTime: '2021/03/30 14:24', status: false},
    {id:8, content:"李存芳完成了您分配的任务‘完成文献翻译’", createTime: '2021/03/30 14:24', status: false},
    {id:9, content:"刘志强更改了‘课程管理系统’项目的名字：‘课程管理系统开发’", createTime: '2021/03/30 14:24', status: false},
    {id:10, content:"赵明德邀请您加入‘课程管理系统开发项目组’团队", createTime: '2021/03/30 14:24', status: true},
    {id:11, content:"赵明德邀请您加入‘课程管理系统开发项目组’团队", createTime: '2021/03/15 14:24', status: true},
    {id:12, content:"萧何接收了您的邀请，加入‘课程管理系统开发项目组’团队", createTime: '2021/03/14 14:24', status: true},
    {id:13, content:"赵明德在‘课程管理系统开发项目组’团队创建了项目‘课程管理系统’", createTime: '2021/03/05 14:24', status: true},
    {id:14, content:"赵明德评论了您的资源‘需求分析-李存芳’：挺好，不过参考文献格式稍微改改", createTime: '2021/03/01 14:24', status: true},
    {id:15, content:"赵明德回复了您的评论‘好的’：嗯，辛苦了！", createTime: '2021/02/28 14:24', status: true},
    {id:16, content:"赵明德在‘课程管理系统’项目中向您分配任务：‘完成数据库设计’", createTime: '2021/02/26 14:24', status: true},
    {id:17, content:"萧何接收了您的任务‘完成任务书’", createTime: '2021/02/20 14:24', status: true},
    {id:18, content:"萧何完成了您分配的任务‘完成文献翻译’", createTime: '2021/02/15 14:24', status: true},
    {id:19, content:"赵明德更改了‘课程管理系统’项目的名字：‘课程管理系统开发’", createTime: '2021/02/01 14:24', status: true},
];

export default {
    change_pswd_suc: (param)=>{
        // console.log(param.body);
        return {
            code: 200,
            msg: "修改成功",
            data: { }
        }
    },
    change_pswd_fai: (param)=>{
        return {
            code: 403,
            msg: "原密码错误，修改失败",
            data: { }
        }
    },
    change_info_suc: (param)=>{
        // console.log(param.body);
        return {
            code: 200,
            msg: "修改成功",
            data: { }
        }
    },
    change_info_fai: (param)=>{
        return {
            code: 403,
            msg: "修改失败",
            data: { }
        }
    },
    get_notifications_suc: (param)=>{
        if(JSON.parse(param.body).read)
            return {
                code: 200,
                msg: "请求成功",
                data: {
                    notices: notices.slice(9, 19),
                    totalNum: 10
                }
            }
        return {
            code: 200,
                msg: "请求成功",
                data: {
                    notices: notices.slice(0,9),
                    totalNum: 9
                }
            }
    },
    get_notifications_fai: (param)=>{
        return {
            code: 403,
            msg: "获取失败",
        }
    },
}