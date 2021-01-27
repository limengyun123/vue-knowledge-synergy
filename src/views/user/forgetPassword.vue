<template>
    <div class="container">
        <div class="main-content">
            <div class='avatar'><span class="el-icon-user"></span><div class='title'>修改</div></div>
            <el-alert class="error-alert" :title="errorMessage" v-if="showError" type="error" show-icon></el-alert>
            <el-form :model="forgetForm" :rules="rules" ref="forgetForm" status-icon >
                <el-form-item prop="userName">
                    <el-input type="text" v-model="forgetForm.userName" @focus="hideError" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="text" v-model="forgetForm.password" @focus="hideError" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="repeatPassword">
                    <el-input type="text" v-model="forgetForm.repeatPassword" @focus="hideError" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('forgetForm')" class="forget-button">修 改</el-button>
                </el-form-item>
            </el-form>
            <div class="other-operate">
                <router-link to="/user/loginIn" custom v-slot="{ navigate }">
                    <span @click="navigate" @keypress.enter="navigate" role="link">返回登录</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {forgetPasswordApi} from '../../api/user';

export default {
    name: 'ForgetPassword',
    data(){
        return {
            showError: false,
            errorMessage: '',
            forgetForm: {
                userName: '',
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
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    forgetPasswordApi(this.forgetForm).then( (result)=> {
                        this.$message({
                            message: '密码修改成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{this.$router.push('/user/loginIn')}
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

.forget-button{
    width: 15rem;
    font-size: 1rem;
}

.other-operate{
    font-size: 0.8rem;
    color: #eeeeee;
    text-align: right;
}


</style>