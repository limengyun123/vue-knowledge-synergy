<template>
    <div>
        <div class='register-title'>注册</div>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" status-icon >
            <el-form-item prop="userName">
                <el-input type="text" v-model="registerForm.userName" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="actualName">
                <el-input type="text" v-model="registerForm.actualName" prefix-icon="el-icon-s-custom" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="email">
                <el-input type="text" v-model="registerForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱">
                    <template slot="append"><div class="register-send-code" @click="sendCode">{{sendEmailCodeMsg}}</div></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="emailCode">
                <el-input type="text" v-model="registerForm.emailCode" prefix-icon="el-icon-key" placeholder="请输入邮箱验证码"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="registerForm.password"  prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="repeatPassword">
                <el-input type="text" v-model="registerForm.repeatPassword" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')" class="register-button">注 册</el-button>
            </el-form-item>
            <el-form-item>
                <router-link to="/user/login" class='register-other-operate'>返回登录</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {sendEmailCodeApi, registerApi} from '../../api/user';

export default {
    name: 'Register',
    data(){
        return {
            registerForm: {
                userName: '',
                actualName: '',
                email: '',
                emailCode:'',
                password: '',
                repeatPassword:''
            },
            sendEmailCodeMsg: '发送验证码',
            sendCodeHandle: null,
            rules: {
                userName: [
                    { required: true, message: "请输入用户名", trigger: 'blur' },
                    { min: 6, max: 30, message: "用户名长度应在6-30个字符内", trigger: 'blur' }
                ],
                actualName: { required: true, message: "请输入真实姓名", trigger: 'blur' },
                email: [
                    { required: true, message: "请输入邮箱", trigger: 'blur' },
                    { type: 'email',  message: "请输入正确格式", trigger: 'blur' },
                ],
                emailCode:{ required: true, message: "请输入邮箱验证码", trigger: 'blur' },
                password: [
                    { required: true, message: "请输入密码", trigger: 'blur' },
                    { min: 6, max: 30, message: "密码长度应在6-30个字符内", trigger: 'blur' },
                    { pattern: /^\w+$/, message: "请输入数字、字母、下划线", trigger: 'blur' }
                ],
                repeatPassword:  {
                    validator:(rule, value, callback) => {
                        if (this.registerForm.password===value) callback();
                        else callback(new Error('两次密码输入不匹配'));
                    }
                }
            }
        }
    },
    methods: {
        sendCode(){
            if(this.sendCodeHandle==null){
                sendEmailCodeApi({email: this.registerForm.email}).then((result)=>{
                    this.$message.success(result.msg);
                    let count = 60;
                    this.sendCodeHandle = setInterval(()=>{
                        count--;
                        this.sendEmailCodeMsg = `请${count}秒后重发`;
                        if(count==0){
                            clearInterval(this.sendCodeHandle);
                            this.sendCodeHandle = null; 
                            this.sendEmailCodeMsg = "发送验证码"
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
                    registerApi(this.registerForm).then( (result)=> {
                        
                        this.$message({
                            message: '注册成功',
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

.register-title{
    text-align: center;
    color: #ffffff;
    margin-bottom: 2rem;
}

.register-send-code{
    font-size: .6rem;
}

.register-send-code:hover{
    color: @support-color-ps;
}

.other-operate{
    color: #eeeeee;
    font-size: 0.8rem;
    text-align: right;
}

.register-button{
    width: 100%;
}


.register-other-operate{
    font-size: 0.8rem;
    color: @support-color-ps;
    text-decoration: none;
}

.register-other-operate:hover{
    color: @main-color;
}

</style>