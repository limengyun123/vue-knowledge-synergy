const teams = [
    { teamName: "暨南软件影票售卖系统", teamId: 1, leaderId: 1, leaderName: '赵天泽'},
    { teamName: "你知科研团队", teamId: 2, leaderId: 2, leaderName: '周欣'},
    { teamName: "刘培念课题组", teamId: 3, leaderId: 3, leaderName: '吴名'},
    { teamName: "长江数据中心云计算与安全平台", teamId: 4, leaderId: 4, leaderName: '赵四海'},
    { teamName: "湘西文化学院考古科研团队", teamId: 5, leaderId: 5, leaderName: '杨为家'},
    { teamName: "刘培念课题组", teamId: 6, leaderId: 6, leaderName: '吴名'},
    { teamName: "长江数据中心云计算与安全平台", teamId: 7, leaderId: 7, leaderName: '赵四海'},
    { teamName: "湘西文化学院考古科研团队", teamId: 8, leaderId: 8, leaderName: '杨为家'},
];

const projects = [
    [
        { projectName: "cinema_tickets_version_0.8", projectId: 1, isFinish: false},
        { projectName: "cinema_tickets_version_1.0", projectId: 2, isFinish: false},
    ],
    [
        { projectName: "河北省公路地质灾害预警系统的初步构建", projectId: 3, isFinish: false},
        { projectName: "新民居建设对耕地利用的影响调查研究", projectId: 4, isFinish: false},
        { projectName: "中西方高等教育背景下大学生创业意识的比较研究", projectId: 5, isFinish: false},
        { projectName: "有限元强度折减法在边坡稳定性中的应用研究", projectId: 6, isFinish: false},

        { projectName: "河北省公路地质灾害预警系统的初步构建", projectId: 13, isFinish: false},
        { projectName: "新民居建设对耕地利用的影响调查研究", projectId: 14, isFinish: false},
        { projectName: "中西方高等教育背景下大学生创业意识的比较研究", projectId: 15, isFinish: false},
        { projectName: "有限元强度折减法在边坡稳定性中的应用研究", projectId: 16, isFinish: false},
        { projectName: "河北省公路地质灾害预警系统的初步构建", projectId: 23, isFinish: false},
        { projectName: "新民居建设对耕地利用的影响调查研究", projectId: 24, isFinish: false},
        { projectName: "中西方高等教育背景下大学生创业意识的比较研究", projectId: 25, isFinish: false},
        { projectName: "有限元强度折减法在边坡稳定性中的应用研究", projectId: 26, isFinish: false},
        { projectName: "河北省公路地质灾害预警系统的初步构建", projectId: 33, isFinish: true},
        { projectName: "新民居建设对耕地利用的影响调查研究", projectId: 34, isFinish: true},
        { projectName: "中西方高等教育背景下大学生创业意识的比较研究", projectId: 35, isFinish: false},
        { projectName: "有限元强度折减法在边坡稳定性中的应用研究", projectId: 36, isFinish: true},
        { projectName: "河北省公路地质灾害预警系统的初步构建", projectId: 43, isFinish: true},
        { projectName: "新民居建设对耕地利用的影响调查研究", projectId: 44, isFinish: true},
        { projectName: "中西方高等教育背景下大学生创业意识的比较研究", projectId: 45, isFinish: true},
        { projectName: "有限元强度折减法在边坡稳定性中的应用研究", projectId: 46, isFinish: true},
    ],
    [
        { projectName: "功能有机分子的设计与合成", projectId: 7},
        { projectName: "表面合成反应与低维纳米材料合成", projectId: 8},
        { projectName: "精细化学品与医药中间体合成", projectId: 9},
    ]
];
const teammates = [
    [
        { id:1, userName: "41514", actualName: "赵天泽"},
        { id:2, userName: "c234", actualName: "赵浩" }
    ],
    [
        { id:3, userName: "12414", actualName: "孙香"},
        { id:4, userName: "1242", actualName: "李志鹏" },
        { id:5, userName: "2456", actualName: "周欣" },
        { id:6, userName: "53445", actualName: "黄圣日"},
        { id:7, userName: "69885", actualName: "吴名" },
        { id:8, userName: "13547", actualName: "张三" },
        { id:9, userName: "96786", actualName: "李四"},
        { id:10, userName: "264565", actualName: "李志鹏" },
        { id:11, userName: "856756", actualName: "王老五" },
    ],
    [
        { id:12, userName: "12424", actualName: "吴名" }
    ]
];

const contacts = [
    { id:1, email: "123@qq.com", userName: "全有", actualName: "赵天泽"},
    { id:2, email: "1234@qq.com", userName: "zh", actualName: "赵浩" },
    { id:3, email: "12345@qq.com", userName: "栀子花开", actualName: "孙香"},
    { id:4, email: "123456@qq.com", userName: "鹰", actualName: "李志鹏" },
    { id:5, email: "111111@qq.com", userName: "隔壁家的姑娘", actualName: "周欣" },
    { id:6, email: "222222@qq.com", userName: "NAN", actualName: "吴名" },
    { id:7, email: "1832102745@qq.com", userName: "托尼", actualName: "张三" },
    { id:8, email: "qannap@126.com", userName: "重拾记忆", actualName: "李四" },
    { id:9, email: "15074705606@qq.com", userName: "打工人", actualName: "王老五" }
];

const authority = [
    {
        id: 1,
        actualName: '赵天泽',
        sex: false,
        email: '123@qq.com',
        phone: '15083927492',
        enterTime: '2020-09-21 18:42',
        authority:'111111'
    },
    {
        id: 2,
        actualName: '赵浩',
        sex: true,
        email: '1234@qq.com',
        phone: '18573829753',
        enterTime: '2020-09-21 18:42',
        authority:'1010110'
    },
];

export default{
    get_teams_suc:(param)=>{
        return {
            code: 200,
            msg: "查询成功",
            data: teams
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
        let teamId = JSON.parse(param.body).teamId;
        return {
            code: 200,
            msg: "查询成功",
            data: {projects: projects[teamId-1], teamMembers:teammates[teamId-1], authority:'1111111'}
            
        }
    },
    get_team_info_fai:(param)=>{
        return {
            code: 403,
            msg: "查询失败，请稍后重试",
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
    join_team_suc:(param)=>{
        return {
            code: 200,
            msg: "已发送申请",
        }
    },
    join_team_fai:(param)=>{
        return {
            code: 403,
            msg: "申请发送失败",
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
        let email = JSON.parse(param.body).email;
        let data = {};
        for(let user of contacts){
            if(user.email==email){
                data = user;
            }
        }
        return {
            code: 200,
            msg: "请求成功",
            data: [data]
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
    get_teammates_suc:(param)=>{
        return {
            code: 200,
            msg: "添加成功",
            data: teammates[param.body-1],
        }
    },
    get_teammates_fai:(param)=>{
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
    edit_team_suc:(param)=>{
        return {
            code: 200,
            msg: "信息修改成功",
        }
    },
    edit_team_fai:(param)=>{
        return {
            code: 403,
            msg: "信息修改失败",
        }
    },
    transfer_team_suc:(param)=>{
        return {
            code: 200,
            msg: "成功移交团队",
        }
    },
    transfer_team_fai:(param)=>{
        return {
            code: 403,
            msg: "移交团队失败",
        }
    },
    quit_team_suc:(param)=>{
        return {
            code: 200,
            msg: "成功退出",
        }
    },
    quit_team_fai:(param)=>{
        return {
            code: 403,
            msg: "退出团队失败",
        }
    },
    get_authority_suc:(param)=>{
        return {
            code: 200,
            msg: "成功获取成员权限",
            data: authority
        }
    },
    get_authority_fai:(param)=>{
        return {
            code: 403,
            msg: "获取成员权限失败",
        }
    },
    edit_authority_suc:(param)=>{
        return {
            code: 200,
            msg: "成功修改权限",
        }
    },
    edit_authority_fai:(param)=>{
        return {
            code: 403,
            msg: "修改权限失败",
        }
    },
}