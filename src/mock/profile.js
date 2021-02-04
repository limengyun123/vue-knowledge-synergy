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
    }
}