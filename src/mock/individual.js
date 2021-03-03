const toDoLidt = [
    {eId: 1, startTime: '2020-03-02', deadline: '2020-03-04', type: 'b', description: '完成待办事项界面设计'},
    {eId: 2, startTime: '2020-03-02', deadline: '2020-03-7', type: 'c', description: '完成开题报告'},
    {eId: 3, startTime: '2020-03-02', deadline: '2020-6-20', type: 'a', description: '考驾照'},
    {eId: 4, startTime: '2020-03-02', deadline: '2020-6-20', type: 'b', description: '准备生日礼物，并于阴历4月20送出'},
    {eId: 5, startTime: '2020-03-03', deadline: '2020-07-01', type: 'a', description: '再次参观武汉市植物园'},
    {eId: 6, startTime: '2020-03-03', deadline: '2020-03-07', type: 'b', description: '和室友吃韩式料理'},
];

export default{
    get_todo_overview_suc:(param)=>{
        return {
            code: 200,
            msg: "查询成功",
            data: {
                task: {important: 3, urgent: 2, leisure: 10},
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
}