const resources=[
    { resourceId: 1, resourceName: "立项文档", authorId: '234', userName: '赵浩', resourceCreateTime: '2020-03-22 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 0, resourceIsDeleted: false },
    { resourceId: 2, resourceName: "项目计划", authorId: '41514', userName: '钱正来', resourceCreateTime: '2020-03-25 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 1, resourceIsDeleted: false },
    { resourceId: 3, resourceName: "需求文档", authorId: '12414', userName: '孙香', resourceCreateTime: '2020-04-01 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB',resourceReview: 2, resourceIsDeleted: false },
    { resourceId: 4, resourceName: "系统设计", authorId: '1242', userName: '李志鹏', resourceCreateTime: '2020-4-12 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 0, resourceIsDeleted: false },
    { resourceId: 5, resourceName: "源码", authorId: '2456', userName: '周欣', resourceCreateTime: '2020-04-22 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 1, resourceIsDeleted: false },
    { resourceId: 6, resourceName: "项目关闭总结报告", authorId: '12424', userName: '吴名', resourceCreateTime: '2020-05-01 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 2, resourceIsDeleted: false },
    { resourceId: 7, resourceName: "立项文档", authorId: '234', userName: '赵浩', resourceCreateTime: '2020-03-22 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 0, resourceIsDeleted: false },
    { resourceId: 8, resourceName: "项目计划", authorId: '41514', userName: '钱正来', resourceCreateTime: '2020-03-25 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 1, resourceIsDeleted: false },
    { resourceId: 9, resourceName: "需求文档", authorId: '12414', userName: '孙香', resourceCreateTime: '2020-04-01 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 2, resourceIsDeleted: false },
    { resourceId: 10, resourceName: "关于系统设计的一些自我感想", authorId: '1242', userName: '李志鹏', resourceCreateTime: '2020-4-12 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 0, resourceIsDeleted: false },
    { resourceId: 11, resourceName: "源码", authorId: '2456', userName: '周欣', resourceCreateTime: '2020-04-22 12:45', resourceContent: '', resourceType: 1, resourceSize: '12KB', resourceReview: 1, resourceIsDeleted: false },
];

const tasks = [
    {tId:1, type:"a", assigner:"吴名", assigned: "钱正来", uId:3143, startTime:"2021-02-22 16:45", endTime:"2021-03-02 12:00", content: "完成项目的市场调研"},
    {tId:2, type:"b", assigner:"周欣", assigned: "钱正来", uId:3143, startTime:"2021-02-22 16:47", endTime:"2021-03-22 12:00", content: "完成项目的市场调研"},
    {tId:3, type:"c", assigner:"吴名", assigned: "钱正来", uId:3143, startTime:"2021-02-22 16:49", endTime:"2021-03-12 12:00", content: "完成项目的市场调研"},
    {tId:4, type:"d", assigner:"李志鹏", assigned: "赵浩", uId:42345, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
    {tId:5, type:"d", assigner:"周欣", assigned: "阳辰", uId:485865, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
    {tId:6, type:"d", assigner:"吴名", assigned: "赵四海", uId:2354645, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
    {tId:7, type:"d", assigner:"周欣", assigned: "杨为家", uId:58967, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
    {tId:8, type:"d", assigner:"李志鹏", assigned: "吴一舟", uId:235475, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
    {tId:9, type:"d", assigner:"吴名", assigned: "赵浩", uId:42345, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
    {tId:10, type:"d", assigner:"李志鹏", assigned: "孙蔓", uId:254768, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
    {tId:11, type:"d", assigner:"吴名", assigned: "赵浩", uId:42345, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
];

const comments = [
    {commentId:1, userName:"黎忖", id:41244, commentTime:"2020-05-10 13:19", commentReplyId:null, commentContent:"你这儿需要改改。‘3、详细需求’的用例图应该详细些，分析使用该系统的所有人群，他们将用系统来干什么，会在系统用到哪些操作"},
    {commentId:2, userName:"赵浩", id:52323, commentTime:"2020-05-10 13:19", commentReplyId:1, commentContent:"好的，知道了！"},
    {commentId:3, userName:"刘欣悦", id:7563, commentTime:"2020-05-10 13:19", commentReplyId:null, commentContent:"赵兄太强了！"},
    {commentId:4, userName:"楚霖", id:222222, commentTime:"2020-05-10 13:19", commentReplyId:null, commentContent:"太强了！"},
    {commentId:5, userName:"张琪誉", id:12435, commentTime:"2020-05-10 13:19", commentReplyId:null, commentContent:"太强了！"},
    {commentId:6, userName:"赵浩", id:52323, commentTime:"2020-05-10 13:19", commentReplyId:5, commentContent:"你跟着瞎起什么哄呀"},
    {commentId:7, userName:"张琪誉", id:12435, commentTime:"2020-05-10 13:19", commentReplyId:5, commentContent:"哈哈，好玩儿"},
    {commentId:8, userName:"赵浩", id:52323, commentTime:"2020-05-10 13:19", commentReplyId:5, commentContent:"这位老弟，一边玩儿去"},
    {commentId:9, userName:"房梅玲", id:46457, commentTime:"2020-05-10 13:19", commentReplyId:null, commentContent:"强"},
    {commentId:10, userName:"高灵梦", id:111111, commentTime:"2020-05-10 13:19", commentReplyId:null, commentContent:"太强了！"},
];


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
        }
    },
    upload_resources_suc:(param)=>{
        console.log('内容', param.body);
        return {
            code: 200,
            msg: "上传成功",
            data: {}
        }
    },
    upload_resources_fai:(param)=>{
        return {
            code: 403,
            msg: "上传失败，请稍后重试",
        }
    },
    get_tasks_overview_suc:(param)=>{
        return {
            code: 200,
            msg: "查询任务总览成功",
            data:{
                overview:[
                    {total: 6, finished: 3, unFinished:3, overdue: 0 },
                    {total: 22, finished: 16, unFinished:2, overdue: 1 }
                ]
            }
        }
    },
    get_tasks_overview_fai:(param)=>{
        return {
            code: 503,
            msg: "查询失败",
        }
    },
    get_tasks_detail_suc:(param)=>{
        let paramBody = JSON.parse(param.body);
        let isTeamTasks = paramBody.isTeamTasks;
        let classifiedByTask = paramBody.classifiedByTask;
        let tasksReturned = {};

        if(isTeamTasks){
            if(!classifiedByTask){
                for(let item of tasks){
                    if(tasksReturned[item.assigned]==undefined){
                        tasksReturned[item.assigned]=[item];
                    }else{
                        tasksReturned[item.assigned].push(item);
                    }
                }
            }
            else{
                tasksReturned = tasks;
            }
        }
        else{
            tasksReturned = tasks.slice(0,3);
        }
        return {
            code: 200,
            msg: "查询个人任务详情成功",
            data:{tasks: tasksReturned}
        }
    },
    get_tasks_detail_fai:(param)=>{
        return {
            code: 503,
            msg: "查询失败",
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
        }
    },
    get_resource_detail_suc:(param)=>{
        let commentsReturned = [];
        // 前提是评论为时间正序
        for(let item of comments){
            if(item.commentReplyId==null){
                commentsReturned.push(item);
            }
            else{
                for(let comts of commentsReturned){
                    if(item.commentReplyId==comts.commentId){
                        if(comts.replies==undefined) comts.replies=[];
                        comts.replies.push(item);
                        break;
                    }
                }
            }
        }
        // console.log(commentsReturned);
        return {
            code: 200,
            msg: "获取成功",
            data: {resource: resources[0], comments:commentsReturned}
        }
    },
    get_resource_detail_fai:(param)=>{
        return {
            code: 500,
            msg: "获取失败",
        }
    },
}