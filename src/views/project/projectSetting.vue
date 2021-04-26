<template>
    <div>
        <el-form :model="projectInfo" status-icon ref="projectInfo" :rules="infoRules" label-width="100px" class="project-setting-body">
            <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="projectInfo.teamName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="截止日期" prop="deadline">
                <el-date-picker v-model="projectInfo.deadline" type="datetime" placeholder="选择日期时间"> </el-date-picker>
            </el-form-item>
            <el-form-item label="是否归档" prop="finished">
                <el-radio-group v-model="projectInfo.finished">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitProject">确认修改</el-button>
                <el-button type="danger" @click="deleteProject">删除项目</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {editProjectApi, deleteProjectApi} from '../../api/project';

export default {
    name: "ProjectSetting",
    data(){
        return {
            projectInfo:{
                pId: '',
                projectName: '',
                deadline: '',
                finished: false
            },
            infoRules:{

            }
        }
    },
    created(){
        this.projectInfo.pId = this.$route.params.id;
    },

    methods:{
        submitProject(){
            this.$refs['projectInfo'].validate((valid)=>{
                if(valid){
                    editProjectApi(this.projectInfo).then((result)=>{
                        this.$message.success(result.msg);
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    })
                }
            })
        },
        deleteProject(){
            deleteProjectApi(this.projectInfo.pId).then((result)=>{
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1000,
                    onClose:()=>{this.$router.push('/common/team')}
                });
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        }
    }
}
</script>

<style scoped>

.project-setting-body{
    width:30rem;
    margin: 2rem auto;
}
</style>