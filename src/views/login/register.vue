<template>
    <div class="container">
        <div class="main-content">
            <div class='avatar'><span class="el-icon-user"></span><div class='title'>注册</div></div>
            <el-alert class="error-alert" :title="errorMessage" v-if="showError" type="error" show-icon></el-alert>
            <el-form :model="registerForm" :rules="rules" ref="registerForm" status-icon >
                <el-form-item prop="userName">
                    <el-input type="text" v-model="registerForm.userName" @focus="hideError" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="actualName">
                    <el-input type="text" v-model="registerForm.actualName" @focus="hideError" prefix-icon="el-icon-s-custom" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                    <el-input type="text" v-model="registerForm.mobile" @focus="hideError" prefix-icon="el-icon-phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="text" v-model="registerForm.password" @focus="hideError" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="repeatPassword">
                    <el-input type="text" v-model="registerForm.repeatPassword" @focus="hideError" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')" class="register-button">注 册</el-button>
                </el-form-item>
            </el-form>
            <div class="other-operate">
                <router-link to="/login/loginIn" custom v-slot="{ navigate }">
                    <span @click="navigate" @keypress.enter="navigate" role="link">返回登录</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {registerApi} from '../../api/login';

export default {
    name: 'Register',
    data(){
        return {
            showError: false,
            errorMessage: '',
            registerForm: {
                userName: '',
                actualName: '',
                mobile: '',
                password: '',
                repeatPassword:''
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
                actualName: [
                    {
                        required: true,
                        message: "请输入真实姓名",
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: 'blur'
                    },
                    {
                        min: 11,
                        max: 11,
                        message: "号码长度应为11个字符",
                        trigger: 'blur'
                    },
                    {
                        validator:(rule, value, callback) => {
                            let pattern = /\d+/;
                            if (pattern.test(value)) callback();
                            else callback(new Error('请输入数字'));
                        }
                    }
                    
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 30,
                        message: "密码长度应在6-30个字符内",
                        trigger: 'blur'
                    },
                    {
                        pattern: /^\w+$/,
                        message: "请输入数字、字母、下划线",
                        trigger: 'blur'
                    }
                ],
                repeatPassword: [
                    {
                        validator:(rule, value, callback) => {
                            if (this.registerForm.password===value) callback();
                            else callback(new Error('两次密码输入不匹配'));
                        }
                    }
                ]
            }
        }
    },

    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    registerApi(this.registerForm).then( (result)=> {
                        
                        this.$message({
                            message: '注册成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{this.$router.push('/login/loginIn')}
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
	background:url("~@/assets/img/bg_0.jpg") 0 / cover fixed;
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

.register-button{
    width: 15rem;
    font-size: 1rem;
}

.other-operate{
    color: #eeeeee;
    font-size: 0.8rem;
    text-align: right;
}

</style>