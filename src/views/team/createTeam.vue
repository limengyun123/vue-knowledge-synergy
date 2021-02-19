<template>
    <div>
        <el-header class='create-team-head'><span class="el-icon-back" @click="getBack"></span></el-header>
        <div class="create-team-body">
            <el-alert class="error-alert" :title="errorInfoMessage" v-if="showInfoError" type="error" show-icon></el-alert>
            <el-form :model="teamInfo" status-icon ref="teamInfo" :rules="infoRules" label-width="100px" class="team-info-form">
                <el-form-item label="团队名称" prop="teamName">
                    <el-input v-model="teamInfo.teamName" autocomplete="off" @focus="showInfoError=false"></el-input>
                </el-form-item>
                <el-form-item label="组长" prop="teamLeader">
                    <el-input v-model="teamInfo.teamLeader" autocomplete="off" disabled @focus="showInfoError=false"></el-input>
                </el-form-item>
                <el-form-item label="组员" prop="teamMembers">
                    <span class="el-icon-refresh" @click="function(){showDialog = true;showInfoError=false}">添加组员</span>
                    <div>
                        <span v-for="member in teamInfo.teamMembers" :key="member.uId">{{member}}</span>
                    </div>  
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitTeam">创建团队</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="添加组员" :visible.sync="showDialog" width="30%">
            <el-alert class="error-alert" :title="errorMembersMessage" v-if="showMembersError" type="error" show-icon></el-alert>
            <el-checkbox-group v-model="teamInfo.teamMembers" :max="50">
                <div v-for="member in myContacts" :key="member.uId"><el-checkbox :label="member">{{member}}</el-checkbox></div>
            </el-checkbox-group>
            <el-button type="primary" @click="showDialog = false">确 定</el-button>
        </el-dialog>
    </div>
</template>

<script>
import {createTeamApi} from '../../api/team'

export default {
    name: "CreateTeam",
    data(){
        return {
            showInfoError: false,
            showMembersError: false,
            errorInfoMessage: '',
            errorMembersMessage: '',
            showDialog: false,
            teamInfo: {
                teamName: "",
                teamLeader: "",
                teamMembers: ['张三']
            },
            myContacts:['张三','李四','王老五'],
            infoRules:{
                teamName:[
                    {
                        min: 2,
                        max: 30,
                        message: "请输入2-30个字符",
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: "请输入团队名称",
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    mounted(){
        this.teamInfo.teamLeader = this.$store.state.userInfo.userName;
    },
    methods:{
        getBack(){
            this.$router.back(-1);
        },
        submitTeam(){
            console.log(123);
            this.$refs["teamInfo"].validate((valid)=>{
                if(valid){
                    createTeamApi(this.teamInfo).then((result)=>{
                        this.$message({
                            message: '创建成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{this.$router.push('/common/team')}
                        });
                    }).catch((reason)=>{
                        this.showInfoError = true;
                        this.errorInfoMessage = reason;     
                    });
                }
            })
        },
        
    }
}
</script>

<style scoped>
.create-team-head{
    background-color: blue;
    font-size: 2rem;
    color:white;
    padding: 0.4rem 1rem;
}

.create-team-body{
    width:30rem;
    margin: 2rem auto;
}
</style>