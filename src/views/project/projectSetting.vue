<template>
    <div>
        <el-form :model="projectInfo" status-icon ref="projectInfo" :rules="infoRules" label-width="100px" class="project-setting-body">
            <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="projectInfo.projectName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目描述" prop="pDescription">
                <el-input type="textarea" v-model="projectInfo.pDescription" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="截止日期" prop="deadline">
                <el-date-picker v-model="projectInfo.deadline" type="datetime" placeholder="选择日期时间"> </el-date-picker>
            </el-form-item>
            <el-form-item label="是否归档" prop="isFinish">
                <el-radio-group v-model="projectInfo.isFinish">
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
                projectId: '',
                projectName: '',
                pDescription:'',
                deadline: '',
                isFinish: false
            },
            infoRules:{
                projectName:[
                    { min: 2, max: 30, message: "请输入2-30个字符", trigger: 'blur' },
                    { required: true, message: "请输入项目名称", trigger: 'blur' }
                ],
                pDescription:[
                    { min: 1, max: 100, message: "请输入1-100个字符", trigger: 'blur' },
                    { required: true, message: "请输入项目描述", trigger: 'blur' }
                ],
                deadline:[
                    { required: true, message: "请选择任务结束时间", trigger: 'blur' },
                    {
                        validator:(rule, value, callback)=>{
                            if(value>new Date()){
                                callback();
                            }
                            callback(new Error("请检查是否选择错误"));
                            
                        },
                        trigger: blur
                    }
                ]
            }
        }
    },
    created(){
        this.projectInfo = this.$store.state.projectInfo;
    },

    methods:{
        submitProject(){
            this.$refs['projectInfo'].validate((valid)=>{
                if(valid){
                    editProjectApi(this.projectInfo).then((result)=>{
                        this.$message.success("成功修改项目");
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    })
                }
            })
        },
        deleteProject(){
            deleteProjectApi(this.projectInfo.projectId).then((result)=>{
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

<style>

.project-setting-body{
    width:30rem;
    margin: 2rem auto;
}
</style>