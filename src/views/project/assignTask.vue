<template>
    <div>
        <GoBackHead />
        <el-form :model="task" ref="task" status-icon :rules="rules" label-width="100px" class="assign-task-body">
            <el-form-item label="指派人" prop="assignerName">
                <el-input v-model="task.assignerName" disabled></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-date-picker v-model="task.startTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
            </el-form-item>
            <el-form-item label="截止时间" prop="deadline">
                <el-date-picker v-model="task.deadline" type="datetime" placeholder="选择日期时间"> </el-date-picker>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="task.description"></el-input>
            </el-form-item>
            <el-form-item label="受任者" prop="assigned">
                <el-checkbox-group v-model="task.assigned" class="mates-box">
                    <div v-for="member in mates" :key="member.userName">
                        <el-checkbox :label="member.userName">{{member.actualName}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="submit-button" @click="submitTask">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import GoBackHead from '../../components/goBackHead';
import {getTeammatesApi, assignTaskApi} from '../../api/project';

export default {
    name: "AssignTask",
    components:{
        'GoBackHead': GoBackHead
    },
    data(){
        return {
            mates:[],
            task:{
                assigner: '',
                assignerName: '',
                startTime: '',
                deadline: '',
                description: '',
                assigned: []
            },
            rules:{
                startTime:{ required: true, message: "请选择任务开始时间", trigger: 'blur' },
                deadline:[
                    { required: true, message: "请选择任务结束时间", trigger: 'blur' },
                    {
                        validator:(rule, value, callback)=>{
                            if(value>this.task.startTime){
                                callback();
                            }
                            callback(new Error("请检查是否选择错误"));
                            
                        },
                        trigger: blur
                    }
                ],
                description:[
                    { required: true, message: "请对任务加以描述", trigger: 'blur' },
                    { min: 1, max: 500, message: "请输入1-500个字符", trigger: 'blur' }
                ],
                assigned:{ required: true, message: "请选择受任者", trigger: blur }
            }
        }
    },
    created(){
        this.task.assigner = this.$store.state.userInfo.userName;
        this.task.assignerName = this.$store.state.userInfo.actualName;

        let pId = this.$store.state.teamInfo.teamChosenId;
        if(pId==null){
            this.$message.error("不好意思，出错了");
        }
        else{
            let mates = this.$store.state.teamInfo.teammates;
            if(mates.length){
                // console.log("from memory");
                this.mates = mates;
            }
            else{
                // 请求队员资料
                getTeammatesApi(pId).then((result)=>{
                    this.mates = result.data;
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
                // console.log("from request");
            }
        }
        
    },
    methods:{
        submitTask(){
            this.$refs['task'].validate((valid)=>{
                if(valid){
                    //console.log(this.task);
                    assignTaskApi(this.task).then((result)=>{
                        this.$message.success(result.msg);
                        this.$refs["task"].resetFields();
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.assign-task-body{
    width: 30rem;
    margin: 2rem auto;
}

.mates-box{
    max-height: 20rem;
    overflow: scroll;
}

.submit-button{
    margin: 0 40%;
}
</style>