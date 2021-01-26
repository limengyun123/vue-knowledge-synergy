<template>
    <div>
        <div>
        </div>
        <div class="main-content">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon >
                <el-form-item label="用户名" prop="userName">
                    <el-input type="text" v-model="loginForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="tab">
                <router-link to="/user/forgetPassword" custom v-slot="{ navigate }">
                    <span @click="navigate" @keypress.enter="navigate" role="link">忘记密码</span>
                </router-link>
                <router-link to="/user/register" custom v-slot="{ navigate }">
                    <span @click="navigate" @keypress.enter="navigate" role="link">注册</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import loginApi from '../../api/login'

export default {
    name: 'Login',
    data(){
        return {
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
            let _this = this;
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    loginApi.login(this.loginForm).then(function (result) {
                        // if (result && result.code === 1) {
                        //     _this.setUserName(_this.loginForm.userName);
                        //     _this.$router.push({ path: '/' });
                        // } else {
                        //     _this.$message.error(result.message);
                        // }
                        alert("登录成功");
                        const token = result.headers['authorization'];
                        _this.$store.commit('SET_TOKEN', token);
                        _this.$store.commit('SET_USERINFO', result.data);
                        //_this.$router.push('/home');
                        
                    }).catch(function (reason) {
                        alert("用户名或密码错误");
                    })
        } 
                else{
                    console.log("error submit.");
                    return false;
                }
            })
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.main-content{
    width: 300px;
    text-align: center;
    margin: auto;
}
</style>