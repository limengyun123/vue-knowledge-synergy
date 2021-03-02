const projects = [
    [
        { pName: "cinema_tickets_version_0.8", pId: 1},
        { pName: "cinema_tickets_version_1.0", pId: 2},
    ],
    [
        { pName: "河北省公路地质灾害预警系统的初步构建", pId: 3},
        { pName: "新民居建设对耕地利用的影响调查研究", pId: 4},
        { pName: "中西方高等教育背景下大学生创业意识的比较研究", pId: 5},
        { pName: "有限元强度折减法在边坡稳定性中的应用研究", pId: 6}
    ],
    [
        { pName: "功能有机分子的设计与合成", pId: 7},
        { pName: "表面合成反应与低维纳米材料合成", pId: 8},
        { pName: "精细化学品与医药中间体合成", pId: 9},
    ]
];
const teammates = [
    [
        { userName: "41514", actualName: "钱全有"},
        { userName: "c234", actualName: "赵浩" }
    ],
    [
        { userName: "12414", actualName: "孙香"},
        { userName: "1242", actualName: "李志鹏" },
        { userName: "2456", actualName: "周欣" },
    ],
    [
        { userName: "12424", actualName: "吴名" }
    ]
];

const contacts = [
    { userName: "41514", actualName: "钱全有"},
    { userName: "c234", actualName: "赵浩" },
    { userName: "12414", actualName: "孙香"},
    { userName: "1234", actualName: "李志鹏" },
    { userName: "2456", actualName: "周欣" },
    { userName: "12424", actualName: "吴名" },
    { userName: "7209534753", actualName: "张三" },
    { userName: "19658230", actualName: "李四" },
    { userName: "2689323", actualName: "王老五" }
]

export default{
    get_teams_suc:(param)=>{
        return {
            code: 200,
            msg: "查询成功",
            data: [
                { tName: "暨南软件影票售卖系统", tId: 1, tType: "C"},
                { tName: "你知科研团队", tId: 2, tType: "A"},
                { tName: "刘培念课题组", tId: 3, tType: "B"}
            ]
        }
    },
    get_teams_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败，请稍后重试",
            data: { }
        }
    },
    get_team_info_suc:(param)=>{
        return {
            code: 200,
            msg: "查询成功",
            data: {projects: projects[param.body-1], teammates:teammates[param.body-1]}
            
        }
    },
    get_team_info_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败，请稍后重试",
            data: { }
        }
    },
    create_team_suc:(param)=>{
        return {
            code: 200,
            msg: "添加成功",
            data:{} 
        }
    },
    create_team_fai:(param)=>{
        return {
            code: 403,
            msg: "团队名称重复",
            data: { }
        }
    },
    get_contacts_suc:(param)=>{
        return {
            code: 200,
            msg: "请求成功",
            data: contacts
        }
    },
    get_contacts_fai:(param)=>{
        return {
            code: 403,
            msg: "无权",
            data: { }
        }
    },
    search_user_suc:(param)=>{
        let data = {};
        for(let user of contacts){
            if(user.userName==param.body){
                data = user;
            }
        }
        return {
            code: 200,
            msg: "请求成功",
            data: data
        }
    },
    search_user_fai:(param)=>{
        return {
            code: 404,
            msg: "未找到用户，请重新输入用户账号",
            data: { }
        }
    },
    add_teammates_suc:(param)=>{
        return {
            code: 200,
            msg: "添加成功",
            data:{} 
        }
    },
    add_teammates_fai:(param)=>{
        return {
            code: 403,
            msg: "添加失败，请稍后重试",
            data: { }
        }
    },
    create_project_suc:(param)=>{
        return {
            code: 200,
            msg: "创建成功",
            data:{} 
        }
    },
    create_project_fai:(param)=>{
        return {
            code: 403,
            msg: "项目名称重复",
            data: { }
        }
    },
}