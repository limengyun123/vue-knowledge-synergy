<template>
    <div>
        <GoBackHead />
        <div class="create-project-body">
            <el-form :model="projectInfo" status-icon ref="projectInfo" :rules="infoRules" label-width="100px" class="project-info-form">
                <el-form-item label="项目名称" prop="projectName">
                    <el-input v-model="projectInfo.projectName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="截止时间" prop="preTime">
                    <el-date-picker v-model="projectInfo.preTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                </el-form-item>
                <el-form-item type="textarea" label="项目描述" prop="pDescription">
                    <el-input type="textarea" v-model="projectInfo.pDescription"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitProject" class="create-project-button">新建项目</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {createProjectApi} from '../../api/team';
import GoBackHead from '../../components/goBackHead';

export default {
    name: "CreateTeam",
    components: {
        'GoBackHead': GoBackHead,
    },
    data(){
        return {
            projectInfo: {
                projectName: "",
                preTime: "",
                pDescription: ""
            },
            infoRules:{
                projectName:[
                    {
                        min: 2,
                        max: 30,
                        message: "请输入2-30个字符",
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: "请输入项目名称",
                        trigger: 'blur'
                    }
                ],
                pDescription:[
                    {
                        min: 1,
                        max: 100,
                        message: "请输入1-100个字符",
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: "请输入项目描述",
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed:{
        teamChosenId: function (){
            return this.$store.state.teamInfo.teamChosenId;
        }
    },
    methods:{
        submitProject(){
            this.$refs["projectInfo"].validate((valid)=>{
                if(valid){
                    createProjectApi({teamId:this.teamChosenId,...this.projectInfo}).then((result)=>{
                        this.$message({
                            message: '创建成功',
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{this.$router.push('/common/team')}
                        });
                    }).catch((reason)=>{
                        this.$message.error(reason);   
                    });
                }
            })
        },
        
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.create-project-body{
    width:30rem;
    margin: 2rem auto;
}

.create-project-button{
    background-color: @support-color-ps;
    border: @support-color-ps;
    margin-left: 6rem;
}

.create-project-button:hover{
    background-color:@main-color;
}

.create-project-button:focus{
    background-color:@main-color;
}

</style>