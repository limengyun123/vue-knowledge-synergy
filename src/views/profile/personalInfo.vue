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
                </el-card>
            </el-col>
            <el-col :span="14">
                <el-form :model="userInfo" status-icon ref="userInfo" label-width="100px" class="user-info-form">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="userInfo.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="actualName">
                    <el-input v-model="userInfo.actualName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input v-model="userInfo.sex"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="userInfo.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userInfo')">提交</el-button>
                </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "PersonalInfo",
    data(){
        return {
            userInfo:{
                userName:'',
                actualName:'',
                sex:'',
                mobile:'',
                email:''
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
        submitForm(formName){}
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