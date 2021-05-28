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
                <el-form-item label="团队简介" prop="brief">
                    <el-input v-model="teamInfo.brief"></el-input>
                </el-form-item>
                <el-form-item label="所属机构" prop="institute">
                    <el-input v-model="teamInfo.institute"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitTeam" class='create-team-button'>创建团队</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {createTeamApi} from '../../api/team'
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
                teamLeaderId: "",
                brief:"",
                institute: "",
            },
            infoRules:{
                teamName:[
                    { min: 2, max: 30, message: "请输入2-30个字符", trigger: 'blur' },
                    { required: true, message: "请输入团队名称", trigger: 'blur' }
                ],
                brief:[
                    { min: 2, max: 30, message: "请输入1-100个字符", trigger: 'blur' },
                    { required: true, message: "请输入团队简介", trigger: 'blur' }
                ],
                institute:[
                    { min: 1, max: 30, message: "请输入1-30个字符", trigger: 'blur' },
                    { required: true, message: "请输入团队所属机构", trigger: 'blur' }
                ],
            }
            
        }
    },
    created(){
        let userInfo = this.$store.state.userInfo;
        this.teamInfo.teamLeader = userInfo.actualName;
        this.teamInfo.teamLeaderId = userInfo.id;
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
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.create-team-body{
    width:30rem;
    margin: 2rem auto;
}

.create-team-button{
    margin-left: 6rem;
}

</style>