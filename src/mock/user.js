// mock数据
export const login_result_suc = {
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

export const login_result_fai = {
    code: 400,
    msg: "账户名或密码错误",
    data: {}
}

export const register_result_suc = {
    code: 200,
    msg: "注册成功",
    headers:{'authorization': 'hfos93789yhef139hfw3827rhg8'},
    data: { }
}

export const register_result_fai = {
    code: 400,
    msg: "该用户已注册",
    data: {}
}

export const forget_result_suc = {
    code: 200,
    msg: "修改成功",
    headers:{'authorization': 'hfos93789yhef139hfw3827rhg8'},
    data: { }
}

export const forget_result_fai = {
    code: 400,
    msg: "用户名或密码错误",
    data: {}
}


