<template>
    <div>
        <el-header class='info-head'><span class="el-icon-back" @click="getBack"></span> </el-header>
        <el-row>
            <el-col :span="10">
                <el-card class="box-card">
                    <div>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>
                    <div><label>用户名：</label><span>{{getInitailUser.userName}}</span></div>
                    <div><label>姓名：</label><span>{{getInitailUser.actualName}}</span></div>
                    <div><label>性别：</label><span>{{getInitailUser.sex}}</span></div>
                    <div><label>手机号码：</label><span>{{getInitailUser.mobile}}</span></div>
                    <div><label>邮箱：</label><span>{{getInitailUser.email}}</span></div>
                    <div><label>密码：</label><span>{{getInitailUser.password}}</span></div>
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-alert class="error-alert" :title="errorInfoMessage" v-if="showInfoError" type="error" show-icon></el-alert>
                <el-form :model="userInfo" status-icon ref="userInfo" :rules="infoRules" label-width="100px" class="user-info-form">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="userInfo.userName" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="actualName">
                        <el-input v-model="userInfo.actualName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio v-model="userInfo.sex" label="男">男</el-radio>
                        <el-radio v-model="userInfo.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="userInfo.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="userInfo.password" disabled></el-input>
                        <span class="el-icon-refresh" @click="showDialog = true">修改密码</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitInfoForm('userInfo')">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-dialog title="修改密码" :visible.sync="showDialog" width="30%">
                <el-alert class="error-alert" :title="errorPswdMessage" v-if="showPswdError" type="error" show-icon></el-alert>
                <el-form :model="passwordForm" :rules="pswdRules" ref="passwordForm" label-width="90px">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input v-model="passwordForm.oldPassword" :show-password=true @focus="showPswdError=false"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="passwordForm.newPassword" :show-password=true @focus="showPswdError=false"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="ensurePassword">
                        <el-input v-model="passwordForm.ensurePassword" :show-password=true @focus="showPswdError=false"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="cancelPswdForm('passwordForm')">取 消</el-button>
                        <el-button type="primary" @click="submitPswdForm('passwordForm')">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            
        </el-row>
    </div>
</template>

<script>
import {changePswdApi, changeInfoApi} from '../../api/profile';

export default {
    name: "PersonalInfo",
    data(){
        var pswdValidator = function(rule, value, callback){
            console.log(value);
            if(value.length==0) callback(new Error('请输入密码'));
            else if(value.length<6 || value.length>30) callback(new Error('用户名长度应在6-30个字符内'));
            else if(/^\w+$/.test(value)==false) callback(new Error('请输入数字、字母、下划线'));
            else callback();

        };
        return {
            showDialog: false,
            showInfoError: false,
            showPswdError: false,
            errorInfoMessage: '',
            errorPswdMessage: '',
            userInfo:{
                userName: '',
                actualName: '',
                sex: '',
                mobile: '',
                email: '',
                password: ''
            },
            passwordForm:{
                oldPassword: '',
                newPassword: '',
                ensurePassword: ''
            },
            infoRules:{
                actualName: {
                    min: 2,
                    max: 30,
                    message: "姓名长度不正确",
                    trigger: 'blur'
                },
                mobile: {
                    min: 11,
                    max: 11,
                    message: "号码长度应为11个字符",
                    trigger: 'blur'
                },
                email: {
                    // pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                    type: 'email',
                    message: "邮箱格式不正确",
                    trigger: 'blur'
                }
            },
            pswdRules:{
                oldPassword: [
                    {
                        validator: pswdValidator,
                        trigger: 'blur'
                    }
                ],
                newPassword: [
                    {
                        validator: pswdValidator,
                        trigger: 'blur'
                    }
                ],
                ensurePassword: [
                    {
                        validator:(rule, value, callback) => {
                            if (this.passwordForm.newPassword===value) callback();
                            else callback(new Error('两次密码输入不匹配'));
                        }
                    }
                ]
            }
        }
    },
    computed:{
        getInitailUser(){
            return this.$store.state.userInfo;
        }
    },
    mounted(){
        Object.assign(this.userInfo,this.$store.state.userInfo);
    },
    methods:{
        getBack(){
            this.$router.back(-1);
        },
        submitInfoForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    changeInfoApi(this.userInfo).then((result)=>{
                        this.$store.commit('SET_USERINFO', Object.assign({},this.userInfo));
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1000,
                        });
                    }).catch((reason)=>{
                        this.showInfoError = true;
                        this.errorInfoMessage = reason;
                    })
                }
            });
        },
        submitPswdForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    changePswdApi(this.passwordForm.oldPassword).then((result)=>{
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{
                                this.showDialog = false;
                                this.userInfo.password = "*".repeat(this.passwordForm.newPassword.length);
                                this.$refs[formName].resetFields();
                            }
                        });
                    }).catch((reason)=>{
                        this.showPswdError = true;
                        this.errorPswdMessage = reason;
                    })
                }
            });
        },
        cancelPswdForm(formName){
            this.showDialog = false;
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.info-head{
    background-color: blue;
    font-size: 2rem;
    color:white;
    padding: 0.4rem 1rem;
}
.box-card{
    width: 20rem;
    margin: 5rem;
    padding: 1rem 2rem;
    
}
.user-info-form{
    width: 25rem;
    margin: 2rem 5rem;
    padding: 2rem;
}
</style>