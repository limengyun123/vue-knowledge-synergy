const privateMessage = [
    {chatWithId:1, sender:'赵如海',notReadNum: 1, latestMessage:'咱们谈谈需求吧！咱们谈谈需求吧！咱们谈谈需求吧！咱们谈谈需求吧！咱们谈谈需求吧！咱们谈谈需求吧！咱们谈谈需求吧！咱们谈谈需求吧！咱们谈谈需求吧！',latestTime: '2020-03-09'},
    {chatWithId:2, sender:'李思源',notReadNum: 0, latestMessage:'项目启动已完成',latestTime: '2020-03-09'},
    {chatWithId:3, sender:'刘芳',notReadNum: 0, latestMessage:'挺好的，我看好你',latestTime: '2020-03-09'},
    {chatWithId:4, sender:'赵如海',notReadNum: 1, latestMessage:'咱们谈谈需求吧！',latestTime: '2020-03-09'},
    {chatWithId:5, sender:'李思源',notReadNum: 0, latestMessage:'项目启动已完成',latestTime: '2020-03-09'},
    {chatWithId:6, sender:'刘芳',notReadNum: 0, latestMessage:'挺好的，我看好你',latestTime: '2020-03-09'},
    {chatWithId:7, sender:'赵如海',notReadNum: 1, latestMessage:'咱们谈谈需求吧！',latestTime: '2020-03-09'},
    {chatWithId:8, sender:'李思源',notReadNum: 0, latestMessage:'项目启动已完成',latestTime: '2020-03-09'},
    {chatWithId:9, sender:'刘芳',notReadNum: 0, latestMessage:'挺好的，我看好你',latestTime: '2020-03-09'},
    {chatWithId:10, sender:'赵如海',notReadNum: 1, latestMessage:'咱们谈谈需求吧！',latestTime: '2020-03-09'},
    {chatWithId:11, sender:'李思源',notReadNum: 0, latestMessage:'项目启动已完成',latestTime: '2020-03-09'},
    {chatWithId:12, sender:'刘芳',notReadNum: 0, latestMessage:'挺好的，我看好你',latestTime: '2020-03-09'},
];

const teamMessage = [
    {teamId:1, team: "你知科研团队",notReadNum: 10, latestSender: "孙香", latestMessage: "收到" ,latestTime: '2020-03-09'},
    {teamId:2, team: "暨南软件影票售卖系统",notReadNum: 10, latestSender: "赵浩", latestMessage: "老师新年快乐~" ,latestTime: '2020-02-17'},
    {teamId:3, team: "刘培念课题组",notReadNum: 1, latestSender: "吴名", latestMessage: "大家查看下任务大家查看下任务大家查看下任务大家查看下任务" ,latestTime: '2020-03-09'},
];

const messageRecord = [
    { messageId:1, senderId: 24124, senderName: "赵如海", sendTime: '2020-03-05 14:23', messageType: 1, content: 'hello! 请多多指教'},//文字内容
    { messageId:2, senderId: 24124, senderName: "赵如海", sendTime: '2020-03-05 14:24', messageType: 1, content: '/微笑'},//文字内容
    { messageId:3, senderId: 4124, senderName: "秦淑远", sendTime: '2020-03-05 14:24', messageType: 1, content: '欢迎！'},//文字内容
    { messageId:4, senderId: 111111, senderName: "赵天泽", sendTime: '2020-03-05 14:24', messageType: 1, content: '你好，欢迎加入我们团队'},//文字内容
    { messageId:5, senderId: 111111, senderName: "赵天泽", sendTime: '2020-03-05 14:25', messageType: 1, content: '有了你的加入，咱们的团队生活就更丰富了有了你的加入，咱们的团队生活就更丰富了有了你的加入，咱们的团队生活就更丰富了有了你的加入，咱们的团队生活就更丰富了有了你的加入，咱们的团队生活就更丰富了有了你的加入，咱们的团队生活就更丰富了有了你的加入，咱们的团队生活就更丰富了有了你的加入，咱们的团队生活就更丰富了'},//文字内容
];


export default {
    get_private_chat_suc:(param)=>{
        return {
            code: 200,
            msg: "请求成功",
            data: privateMessage
        }
    },
    get_private_chat_fai:(param)=>{
        return {
            code: 403,
            msg: "请求失败",
            data: {}
        }
    },
    get_team_chat_suc:(param)=>{
        return {
            code: 200,
            msg: "请求成功",
            data: teamMessage
        }
    },
    get_team_chat_fai:(param)=>{
        return {
            code: 403,
            msg: "请求失败",
            data: {}
        }
    },
    get_message_record_suc:(param)=>{
        return {
            code: 200,
            msg: "请求成功",
            data: messageRecord
        }
    },
    get_message_record_fai:(param)=>{
        return {
            code: 403,
            msg: "请求失败",
            data: {}
        }
    },
    send_message_suc:(param)=>{
        return {
            code: 200,
            msg: "发送成功",
            data: {}
        }
    },
    send_message_fai:(param)=>{
        return {
            code: 403,
            msg: "发送失败",
            data: {}
        }
    },
}