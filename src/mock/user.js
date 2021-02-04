// mock数据
export default{
    login_result_suc: (param)=>{
        //console.log(param.body);
        return { 
            code: 200,
            msg: "登录成功",
            headers:{'authorization': 'hfos93789yhef139hfw3827rhg8'},
            data: {
                actualName: '赵天泽',
                sex: '女',
                mobile: '17305827492',
                email:'184221934@qq.com'
            }
        }
    },
    login_result_fai: ()=> {
        return {
            code: 400,
            msg: "账户名或密码错误",
            data: {}
        }
    },
    register_result_suc: () => {
        return {
            code: 200,
            msg: "注册成功",
            headers:{'authorization': 'hfos93789yhef139hfw3827rhg8'},
            data: { }
        }
    },
    register_result_fai: () => {
        return {
            code: 400,
            msg: "该用户已注册",
            data: {}
        }
    },
    forget_result_suc: () => {
        return {
            code: 200,
            msg: "修改成功",
            headers:{'authorization': 'hfos93789yhef139hfw3827rhg8'},
            data: { }
        }
    },
    forget_result_fai: ()=> {
        return {
            code: 400,
            msg: "用户名或密码错误",
            data: {}
        }
    }
}

