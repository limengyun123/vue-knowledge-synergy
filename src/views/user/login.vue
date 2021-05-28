<template>
    <div>
        <div class='login-title'>登录</div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon >
            <el-form-item prop="email">
                <el-input v-model="loginForm.email" name="email" prefix-icon="el-icon-user-solid" placeholder="请输入邮箱" autocomplete="on"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" :show-password='true' placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="login-button">登 录</el-button>
            </el-form-item>
            <el-form-item >
                <router-link to="/user/forgetPassword" class="login-other-operate">忘记密码?</router-link>
                <router-link to="/user/register" class="login-other-operate">注册</router-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {loginApi} from '../../api/user';

export default {
    name: 'Login',
    data(){
        return {
            loginForm: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: "请输入邮箱", trigger: 'blur' },
                    { type: 'email',  message: "请输入正确格式", trigger: 'blur' }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: 'blur' },
                    { min: 6, max: 30, message: "请输入6-30位密码", trigger: 'blur' },
                    {
                        validator: (rule, value, callback)=>{
                            if(value === '') callback(new Error("请输入密码"));
                            else callback();
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },

    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    loginApi({user:this.loginForm}).then((result)=> {
                        this.$store.commit('SET_TOKEN', result.data.token);
                        // this.loginForm.password = this.loginForm.password.replace(/\w/g, '*');
                        this.$store.commit('SET_USERINFO', Object.assign({},this.loginForm,result.data.user));
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{this.$router.push('/common');}
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
.login-title{
    text-align: center;
    color: #ffffff;
    margin-bottom: 2rem;
}

.login-button{
    width: 100%;
}

.login-other-operate{
    font-size: 0.8rem;
    color: @support-color-ps;
    text-decoration: none;
}

.login-other-operate:last-of-type{
    float: right;
}

.login-other-operate:hover{
    color: @main-color;
}

</style>