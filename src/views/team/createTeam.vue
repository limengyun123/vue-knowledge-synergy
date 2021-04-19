<template>
    <div>
        <GoBackHead />
        <div class="create-team-body">
            <el-form :model="teamInfo" status-icon ref="teamInfo" :rules="infoRules" label-width="100px" class="team-info-form">
                <el-form-item label="团队名称" prop="teamName">
                    <el-input v-model="teamInfo.teamName"></el-input>
                </el-form-item>
                <el-form-item label="组长" prop="teamLeader">
                    <el-input v-model="teamInfo.teamLeader" disabled></el-input>
                </el-form-item>
                <el-form-item label="团队简介" prop="teamBreif">
                    <el-input v-model="teamInfo.teamBreif"></el-input>
                </el-form-item>
                <el-form-item label="所属机构" prop="teamInstitute">
                    <el-input v-model="teamInfo.teamInstitute"></el-input>
                </el-form-item>
                <el-form-item label="成员" prop="teamMembers">
                    <span class="el-icon-refresh" @click="showDialog = true">添加成员</span>
                    <el-tag v-for="member in teamInfo.teamMembers" :key="member" closable :disable-transitions="false" 
                        @close="handleClose(member.userName)" class='create-team-add-teammates'>
                        {{getActualName(member)}}
                    </el-tag> 
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitTeam" class='create-team-button'>创建团队</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="添加成员" :visible.sync="showDialog" width="30%">
            <el-checkbox-group v-model="teamInfo.teamMembers" :max="50">
                <div v-for="member in myContacts" :key="member.userName"  class='create-team-add-teammates'><el-checkbox :label="member.userName">{{member.actualName}}</el-checkbox></div>
            </el-checkbox-group>
            <el-button @click="showDialog = false" class='create-team-button'>确 定</el-button>
        </el-dialog>
    </div>
</template>

<script>
import {createTeamApi,getContactsApi} from '../../api/team'
import GoBackHead from '../../components/goBackHead'

export default {
    name: "CreateTeam",
    components: {
        'GoBackHead': GoBackHead
    },
    data(){
        return {
            showDialog: false,
            teamInfo: {
                teamName: "",
                teamLeader: "",
                teamBreif:"",
                teamInstitute: "",
                teamMembers: []
            },
            myContacts:[],
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
                ],
                teamBreif:[
                    {
                        min: 2,
                        max: 30,
                        message: "请输入1-100个字符",
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: "请输入团队简介",
                        trigger: 'blur'
                    }
                ],
                teamInstitute:[
                    {
                        min: 1,
                        max: 30,
                        message: "请输入1-30个字符",
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: "请输入团队所属机构",
                        trigger: 'blur'
                    }
                ],
            }
            
        }
    },
    created(){
        this.teamInfo.teamLeader = this.$store.state.userInfo.userName;
        getContactsApi(this.teamInfo.teamLeader).then((result)=>{
            this.myContacts = result.data;
        }).catch((reason)=>{
            this.$message.error(reason);
        });
    },
    computed:{
        getActualName(){
            return (member)=>{
                for(let item of this.myContacts){
                    if(item.userName==member){
                        return item.actualName;
                    }
                }
                return "";
            }
        }
    },
    methods:{
        submitTeam(){
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
        handleClose(tag) {
            for(let index in this.teamInfo.teamMembers){
                if(this.teamInfo.teamMembers[index].userName==tag){
                    this.teamInfo.teamMembers.splice(index,1);
                    break;
                }
            }
        },
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.create-team-body{
    width:30rem;
    margin: 2rem auto;
}
.create-team-add-teammates{
    margin: .5rem;
}

.create-team-button{
    color: white;
    background-color: @support-color-ps;
    border: @support-color-ps;
    margin-left: 6rem;
}

.create-team-button:hover{
    color: white;
    background-color:@main-color;
}

.create-team-button:focus{
    color: white;
    background-color:@main-color;
}

</style>