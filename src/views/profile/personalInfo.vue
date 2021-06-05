<template>
    <div>
        <GoBackHead />
        <div class="personal-info-page">
            <div class='personal-info-overview'>
                <el-card class="box-card">
                    <div class='personal-info-avatar'>
                        <el-avatar>{{getInitailUser.actualName}}</el-avatar>
                    </div>
                    <div class='personal-info-overview-item'><label>用户名：</label><span>{{getInitailUser.userName}}</span></div>
                    <!-- <div class='personal-info-overview-item'><label>姓名：</label><span>{{getInitailUser.actualName}}</span></div> -->
                    <div class='personal-info-overview-item'><label>性别：</label><span>{{getInitailUser.sex=='0'?'女':'男'}}</span></div>
                    <div class='personal-info-overview-item'><label>手机号码：</label><span>{{getInitailUser.phone}}</span></div>
                    <div class='personal-info-overview-item'><label>邮箱：</label><span>{{getInitailUser.email}}</span></div>
                    <div class='personal-info-overview-item'><label>密码：</label><span>{{getInitailUser.password}}</span></div>
                </el-card>
            </div>
            <div class='personal-info-modify'>
                <el-form :model="userInfo" status-icon ref="userInfo" :rules="infoRules" label-width="100px" class="user-info-form">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="userInfo.userName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="actualName">
                        <el-input v-model="userInfo.actualName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio v-model="userInfo.sex" :label="1">男</el-radio>
                        <el-radio v-model="userInfo.sex" :label="0">女</el-radio>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="userInfo.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="userInfo.password" disabled></el-input>
                        <span class="el-icon-refresh" @click="showDialog = true">修改密码</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitInfoForm('userInfo')" class='submit-info-button'>提交修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="showDialog" width="35rem">
            <el-form :model="passwordForm" :rules="pswdRules" ref="passwordForm" label-width="90px" class='change-password-form'>
                <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="passwordForm.email">
                    <template slot="append"><div class="change-password-send-code" @click="sendCode">{{sendEmailCodeMsg}}</div></template>
                </el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input type="text" v-model="passwordForm.code"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="passwordForm.password" :show-password='true' ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="ensurePassword">
                    <el-input v-model="passwordForm.ensurePassword" :show-password='true' ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitPswdForm('passwordForm')" class='submit-password-button'>确 定</el-button>
                    <el-button @click="cancelPswdForm('passwordForm')">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {sendEmailCodeApi} from '../../api/user';
import {changePswdApi, changeInfoApi} from '../../api/profile';
import GoBackHead from '../../components/goBackHead';

export default {
    name: "PersonalInfo",
    components: {
        'GoBackHead': GoBackHead
    },
    data(){
        var pswdValidator = function(rule, value, callback){
            if(value.length==0) callback(new Error('请输入密码'));
            else if(value.length<6 || value.length>30) callback(new Error('用户名长度应在6-30个字符内'));
            else if(/^\w+$/.test(value)==false) callback(new Error('请输入数字、字母、下划线'));
            else callback();

        };
        return {
            showDialog: false,
            userInfo:{
                userName: '',
                actualName: '',
                sex: '',
                phone: '',
                email: '',
                password: ''
            },
            passwordForm:{
                email: '',
                code:'',
                password: '',
                ensurePassword: ''
            },
            sendEmailCodeMsg: '发送验证码',
            sendCodeHandle: null,
            infoRules:{
                userName: [
                    { required: true, message: "请输入用户名", trigger: 'blur' },
                    { min: 1, max: 30, message: "用户名长度应在1-30个字符内", trigger: 'blur' }
                ],
                actualName: [
                    { required: true, message: "请输入真实姓名", trigger: 'blur' },
                    { min: 2, max: 30, message: "姓名长度不符合", trigger: 'blur' },
                ],
                sex: { required: true, message: "请选择性别", trigger: 'blur' },
                phone: { min: 11, max: 11, message: "号码长度应为11个字符", trigger: 'blur' },
                email: [
                    { required: true, message: "请输入邮箱", trigger: 'blur' },
                    {type: 'email', message: "邮箱格式不正确", trigger: 'blur' }
                ],
                // pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                password: { required: true, message: "请输入新密码", trigger: 'blur' },
            },
            pswdRules:{
                email: [
                    { required: true, message: "请输入邮箱", trigger: 'blur' },
                    { type: 'email',  message: "请输入正确格式", trigger: 'blur' },
                ],
                code:{ required: true, message: "请输入邮箱验证码", trigger: 'blur' },
                password: [
                    { required: true, message: "请输入新密码", trigger: 'blur' },
                    { validator: pswdValidator, trigger: 'blur' }
                ],
                ensurePassword: [
                    { required: true, message: "请再次输入新密码", trigger: 'blur' },
                    {
                        validator:(rule, value, callback) => {
                            if (this.passwordForm.password===value) callback();
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
    created(){
        Object.assign(this.userInfo,this.$store.state.userInfo);
    },
    methods:{
        sendCode(){
            if(this.sendCodeHandle==null){
                sendEmailCodeApi({email: this.passwordForm.email}).then((result)=>{
                    this.$message.success("验证码发送成功，请注意查收");
                    let count = 60;
                    this.sendCodeHandle = setInterval(()=>{
                        count--;
                        this.sendEmailCodeMsg = `请${count}秒后重发`;
                        if(count<=0){
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
        submitInfoForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let submitUser = Object.assign({}, this.userInfo);
                    delete submitUser.password;
                    changeInfoApi(submitUser).then(()=>{
                        submitUser.password = "*".repeat(this.userInfo.password.length);
                        this.$store.commit('SET_USERINFO', submitUser);
                        this.$message({
                            message: '信息修改成功',
                            type: 'success',
                            duration: 1000,
                        });
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    })
                }
            });
        },
        submitPswdForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    changePswdApi(this.passwordForm).then(()=>{
                        this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{
                                this.showDialog = false;
                                this.userInfo.password = this.passwordForm.password;
                                // this.userInfo.password = "*".repeat(this.passwordForm.password.length);
                                this.$refs[formName].resetFields();
                            }
                        });
                    }).catch((reason)=>{
                        this.$message.error(reason);
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

<style lang='less'>
@import "../../assets/css/common.less";

.personal-info-page{
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex-wrap: wrap;
    justify-content: space-evenly;
}
.personal-info-overview{
    width: 30rem;
}

.personal-info-modify{
    -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
    -moz-box-flex: 1;         /* OLD - Firefox 19- */
}

.box-card{
    width: 20rem;
    margin: 5rem auto 0;
    padding: 1rem 2rem;
    
}

.personal-info-avatar{
    text-align: center;
    margin-bottom: 1rem;
}

.personal-info-avatar .el-avatar{
    width: 3rem;
    height: 3rem;
    background-color: @support-color-ps;
}

.personal-info-overview-item{
    color: #888888;
    margin: .5rem 1rem;
}

.user-info-form{
    width: 25rem;
    margin: 2rem 5rem 0rem;
    padding: 2rem 2rem 0;
}


.change-password-form{
    width: 25rem;
    margin: 0 4rem 0 3rem;
}

.change-password-send-code{
    font-size: .6rem;
}

.change-password-send-code:hover{
    color: @support-color-ps;
}

.submit-info-button{
    margin-left: 5rem;
}

.submit-password-button{
    margin-left: 3rem;
}

</style>