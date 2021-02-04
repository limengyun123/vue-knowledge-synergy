<template>
    <div class="container">
        <div class="main-content">
            <div class='avatar'><span class="el-icon-user"></span><div class='title'>登录</div></div>
            <el-alert class="error-alert" :title="errorMessage" v-if="showError" type="error" show-icon></el-alert>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon >
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" @focus="hideError" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" @focus="hideError" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="login-button">登 录</el-button>
                </el-form-item>
            </el-form>
            <div class="other-operate">
                <router-link to="/user/forgetPassword" custom v-slot="{ navigate }">
                    <span @click="navigate" @keypress.enter="navigate" role="link">忘记密码?</span>
                </router-link>
                <router-link to="/user/register" custom v-slot="{ navigate }">
                    <span @click="navigate" @keypress.enter="navigate" role="link">立即注册</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {loginApi} from '../../api/user';

export default {
    name: 'Login',
    data(){
        return {
            showError: false,
            errorMessage: '',
            loginForm: {
                password: '',
                userName: ''
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 30,
                        message: "用户名长度应在6-30个字符内",
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: 'blur'
                    },
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
                    loginApi(this.loginForm).then( (result)=> {
                        
                        const token = result.headers['authorization'];
                        this.$store.commit('SET_TOKEN', token);
                        this.loginForm.password = this.loginForm.password.replace(/\w/g, '*');
                        this.$store.commit('SET_USERINFO', Object.assign({},this.loginForm,result.data));
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{this.$router.push('/common')}
                        });
                        
                    }).catch((reason) =>{
                        this.showError = true;
                        this.errorMessage = reason;
                    })
                } 
                else{
                    return false;
                }
            })
        },
        hideError(){
            this.showError = false;
        }
    }
}
</script>

<style scoped>
/* 毛玻璃背景 */
.container::before{
	background:url("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2140868464,3705580502&fm=26&gp=0.jpg") 0 / cover fixed;
    content:'';
	position:absolute;
	top:0;
	right:0;
	bottom:0;
	left:0;
	z-index:-1;
	-webkit-filter:blur(0.7rem);
	filter:blur(0.7rem);
}


.main-content{
    border-radius: 3%;
    width: 15rem;
    text-align: center;
    margin: 6rem auto 0;
    padding: 2rem;
    background-color:rgba(248,248,248,0.4);
}
.avatar{
    position: relative;
    bottom: 4rem;
    margin: auto;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color:rgba(64,158,254);
    color:white;
    font-size: 2.5rem;
    opacity: 0.9;
}

.error-alert{
    margin-bottom: 1rem;
    /* transition: all 1s ease ; */
}

.title{
    margin-top: 1rem;
    font-size: 2rem;
}

.login-button{
    width: 15rem;
    font-size: 1rem;
}

.other-operate{
    font-size: 0.6rem;
    color: #eeeeee;
}

.other-operate span:nth-of-type(2){
    margin-left: 7rem;
}

</style>