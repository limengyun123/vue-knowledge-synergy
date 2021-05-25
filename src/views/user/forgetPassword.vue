<template>
    <div>
        <div class='forget-password-title'>修改密码</div>
        <el-form :model="forgetForm" :rules="rules" ref="forgetForm" status-icon >
            <el-form-item prop="email">
                <el-input type="text" v-model="forgetForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱">
                    <template slot="append"><div class="forget-send-code" @click="sendCode">{{sendEmailCodeMsg}}</div></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input type="text" v-model="forgetForm.code" prefix-icon="el-icon-key" placeholder="请输入邮箱验证码"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="forgetForm.password" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="repeatPassword">
                <el-input type="text" v-model="forgetForm.repeatPassword" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('forgetForm')" class="forget-button">修 改</el-button>
            </el-form-item>
            <el-form-item>
                <router-link to="/user/login" class='forget-other-operate'>返回登录</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {sendEmailCodeApi, forgetPasswordApi} from '../../api/user';

export default {
    name: 'ForgetPassword',
    data(){
        return {
            forgetForm: {
                email: '',
                code:'',
                password: '',
                repeatPassword:''
            },
            sendEmailCodeMsg: '发送验证码',
            sendCodeHandle: null,
            rules: {
                email: [
                    { required: true, message: "请输入邮箱", trigger: 'blur' },
                    { type: 'email',  message: "请输入正确格式", trigger: 'blur' },
                ],
                code:{ required: true, message: "请输入邮箱验证码", trigger: 'blur' },
                password: [
                    { required: true, message: "请输入密码", trigger: 'blur' },
                    {
                        validator: (rule, value, callback)=>{
                            if(value === '') callback(new Error("请输入密码"));
                            else callback();
                        },
                        trigger: 'blur'
                    }
                ],
                repeatPassword: [
                    {
                        validator:(rule, value, callback) => {
                            if (this.forgetForm.password===value) callback();
                            else callback(new Error('两次密码输入不匹配'));
                        }
                    }
                ]
            }
        }
    },

    methods: {
        sendCode(){
            if(this.sendCodeHandle==null){
                sendEmailCodeApi({email: this.forgetForm.email}).then(()=>{
                    this.$message.success("验证码发送成功，请注意查收");
                    let count = 60;
                    this.sendCodeHandle = setInterval(()=>{
                        count--;
                        this.sendEmailCodeMsg = `请${count}秒后重发`;
                        if(count<=0){
                            clearInterval(this.sendCodeHandle);
                            this.sendCodeHandle = null; 
                            this.sendEmailCodeMsg = "发送验证码";
                        }
                    }, 1000);
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
            }
            
        },
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    forgetPasswordApi(this.forgetForm).then( ()=> {
                        this.$message({
                            message: '密码修改成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{this.$router.push('/user/login')}
                        });
                        
                    }).catch((reason) =>{
                        this.$message.error(reason);
                    })
                } 
                else{
                    return false;
                }
            })
        },
    }
}
</script>

<style lang='less'>
@import "../../assets/css/common.less";

.forget-password-title{
    text-align: center;
    color: #ffffff;
    margin-bottom: 2rem;
}

.forget-send-code{
    font-size: .6rem;
}

.forget-send-code:hover{
    color: @support-color-ps;
}

.forget-button{
    width: 100%;
}

.forget-other-operate{
    font-size: 0.8rem;
    color: @support-color-ps;
    text-decoration: none;
}

.forget-other-operate:hover{
    color: @main-color;
}



</style>