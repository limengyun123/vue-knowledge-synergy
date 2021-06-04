const toDoLidt = [
    {taskId: 1, startTime: '2020-03-02', deadline: '2020-03-04', type: 'b', description: '完成待办事项界面设计'},
    {taskId: 2, startTime: '2020-03-03', deadline: '2020-03-07', type: 'c', description: '完成开题报告'},
    {taskId: 3, startTime: '2020-03-07', deadline: '2020-06-20', type: 'a', description: '考驾照'},
    {taskId: 4, startTime: '2020-03-11', deadline: '2020-04-20', type: 'b', description: '准备生日礼物，并于阴历4月20送出'},
    {taskId: 5, startTime: '2020-05-04', deadline: '2020-05-06', type: 'a', description: '再次参观武汉市植物园'},
    {taskId: 6, startTime: '2020-06-10', deadline: '2020-06-10', type: 'b', description: '和室友吃韩式料理'},
];

const contributions = [
    { content: '上传了资源《系统设计详细文档》', timestamp: '2021-03-15' }, 
    { content: '赵四海上传了资源《需求规格说明书》', timestamp: '2021-03-9' },
];

const shorthands = [
    {shorthandId: 1, title:"市场分析", content: "是否需要考虑适用人群", time: '2020-03-12'},
    {shorthandId: 2, title:"前端数据存储", content: "sessionstorage和localstorage合理使用", time: '2020-04-05'},
    // {sId: 3, title:"", content: "那河畔的金柳，是夕阳中的新娘；", time: '2020-03-22'},
    // {sId: 4, title:"", content: "波光里的艳影，在我的心头荡漾。", time: '2020-03-22'},
    // {sId: 5, title:"", content: "软泥上的青荇，油油的在水底招摇；", time: '2020-03-22'},
    // {sId: 6, title:"", content: "在康河的柔波里，我甘心做一条水草！", time: '2020-03-22'},
    // {sId: 7, title:"", content: "那榆荫下的一潭，不是清泉，是天上虹；", time: '2020-03-22'},
    // {sId: 8, title:"", content: "揉碎在浮藻间，沉淀着彩虹似的梦。", time: '2020-03-22'},
    // {sId: 9, title:"", content: "寻梦？撑一支长篙，向青草更青处漫溯；", time: '2020-03-22'},
    // {sId: 10, title:"", content: "满载一船星辉，在星辉斑斓里放歌。", time: '2020-03-22'},
    // {sId: 11, title:"", content: "但我不能放歌，悄悄是别离的笙箫；", time: '2020-03-22'},
    // {sId: 12, title:"", content: "夏虫也为我沉默，沉默是今晚的康桥！", time: '2020-03-22'},
    // {sId: 13, title:"", content: "悄悄的我走了，正如我悄悄的来；", time: '2020-03-22'},
    // {sId: 14, title:"", content: "我挥一挥衣袖，不带走一片云彩。", time: '2020-03-22'},
    // {sId: 15, title:"", content: "小时候，乡愁是一枚小小的邮票。我在这头，母亲在那头。"+
    //     "长大后，乡愁是一张窄窄的船票。我在这头，新娘在那头。", time: '2020-03-22'},
    // {sId: 16, title:"", content: "后来啊，乡愁是一方矮矮的坟墓。我在外头，母亲在里头。"+
    // "而现在，乡愁是一湾浅浅的海峡。我在这头，大陆在那头。", time: '2020-03-22'},
];

export default{
    get_todo_overview_suc:(param)=>{
        return {
            code: 200,
            msg: "查询成功",
            data: {
                task: {urgent: 2, leisure: 10},
                selfEvent: {important: 3, urgent: 1, leisure: 4}
            }
        }
    },
    get_todo_overview_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败",
            data: {}
        }
    },
    get_todo_list_suc:(param)=>{
        let data = [];
        switch (param.body) {
            case "近一周":
                data = toDoLidt.slice(0,1);
                break;
            case "近半月":
                data = toDoLidt.slice(0,2);
                break;
            case "近一月":
                data = toDoLidt.slice(0,3);
                break;
            case "近三月":
                data = toDoLidt.slice(0,4);
                break;
            case "近一年":
                data = toDoLidt.slice(0,5);
                break;
            default:
                data = toDoLidt;
                break;
        };
        return {
            code: 200,
            msg: "查询成功",
            data: data
        }
    },
    get_todo_list_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败",
            data: {}
        }
    },
    get_shorthands_suc:(param)=>{
        let prm = JSON.parse(param.body);
        let cp = prm.currentPage, ps = prm.pageSize;
        
        return {
            code: 200,
            msg: "查询成功",
            data: {
                shorthands: shorthands.slice((cp-1)*ps, cp*ps),
                totalNum: shorthands.length,
            }
        }
    },
    get_shorthands_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败",
            data: {}
        }
    },
    save_shorthand_suc:(param)=>{
        return {
            code: 200,
            msg: "添加成功",
            data: {}
        }
    },
    save_shorthand_fai:(param)=>{
        return {
            code: 403,
            msg: "添加失败",
            data: {}
        }
    },
    get_a_shorthand_suc:(param)=>{
        let result = {};
        for(let item of shorthands){
            if(item.sId==param.body){
                result = item;
            }
        }
        return {
            code: 200,
            msg: "获取成功",
            data: result
        }
    },
    get_a_shorthand_fai:(param)=>{
        return {
            code: 403,
            msg: "获取失败",
            data: {}
        }
    },
    edit_shorthand_suc:(param)=>{
        return {
            code: 200,
            msg: "修改成功",
            data: {}
        }
    },
    edit_shorthand_fai:(param)=>{
        return {
            code: 403,
            msg: "修改失败",
            data: {}
        }
    },
    get_contributions_suc:(param)=>{
        let prm = JSON.parse(param.body);
        let cp = prm.currentPage, ps = prm.pageSize;
        
        return {
            code: 200,
            msg: "查询成功",
            data: {
                contributions: contributions.slice((cp-1)*ps, cp*ps),
                totalNum: contributions.length,
            }
        }
    },
    get_contributions_fai:(param)=>{
        return {
            code: 403,
            msg: "修改失败",
            data: {}
        }
    },
    get_task_urgent_suc:(param)=>{
        let type = JSON.parse(param.body).type;
        let data = [];
        switch(type){
            case 1:
                data = [7, 1, 2, 0 ];
                break;
            case 2:
                data = [36, 5, 6, 3 ];
                break;
            default:
                data = [43, 6, 8, 3];
        }
        return {
            code: 200,
            msg: "查询成功",
            data: data
        }
    },
    get_task_urgent_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败",
        }
    },
    get_task_time_suc:(param)=>{
        let type = JSON.parse(param.body).type;
        let data = [];
        switch(type){
            case 1:
                data = {finished:[0, 1, 0, 0, 1, 1, 1, 0 ],unfinished: [0, 1, 0, 0, 1, 0, 1, 0 ]};
                break;
            case 2:
                data = {finished:[0, 1, 1, 0 ],unfinished: [0, 0, 0, 0]};
                break;
            default:
                data = {finished:[2, 3, 4, 1, 5, 2, 5, 7, 1, 3, 4, 5], unfinished: [0, 1, 0, 1, 1, 2, 0, 3, 1, 1, 0, 2]};
        }
        return {
            code: 200,
            msg: "查询成功",
            data: data
        }
    },
    get_task_time_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败",
        }
    },
}