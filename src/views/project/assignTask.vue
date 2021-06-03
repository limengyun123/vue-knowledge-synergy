<template>
    <div>
        <GoBackHead />
        <el-form :model="task" ref="task" status-icon :rules="rules" label-width="100px" class="assign-task-body">
            <el-form-item label="指派人" prop="assignerName">
                <el-input v-model="task.assignerName" disabled></el-input>
            </el-form-item>
            <el-form-item label="截止时间" prop="planTime">
                <el-date-picker v-model="task.planTime" type="datetime" placeholder="选择日期时间"> </el-date-picker>
            </el-form-item>
            <el-form-item label="描述" prop="content">
                <el-input type="textarea" v-model="task.content"></el-input>
            </el-form-item>
            <el-form-item label="受任者" prop="assigned">
                <el-checkbox-group v-model="assigned" class="mates-box">
                    <div v-for="member in mates" :key="member.id">
                        <el-checkbox :label="member.id">{{member.actualName}}</el-checkbox>
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
import {assignTaskApi} from '../../api/project';
import {getTeamInfoApi} from '../../api/team';

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
                planTime: '',
                content: '',
            },
            assigned: [],
            rules:{
                planTime:[
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
                ],
                content:[
                    { required: true, message: "请对任务加以描述", trigger: 'blur' },
                    { min: 1, max: 500, message: "请输入1-500个字符", trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        this.task.assigner = this.$store.state.userInfo.id;
        this.task.assignerName = this.$store.state.userInfo.actualName;

        let tId = this.$store.state.teamInfo.teamChosenId;
        if(tId==null){
            this.$message.error("不好意思，出错了");
        }
        else{
            let mates = this.$store.state.teamInfo.teammates;
            if(mates && mates.length>0){
                // console.log("from memory");
                this.mates = mates;
            }
            else{
                // 请求队员资料
                getTeamInfoApi({teamId:tId}).then((result)=>{
                    this.mates = result.data.teamMembers || [];
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
                console.log("assigned",this.assigned,this.$route.params.id);
                if(valid){
                    if(this.assigned.length>0){
                        assignTaskApi({
                            task: {projectId: this.$route.params.id, planTime: "2020-07-12 19:00", content: this.task.content},
                            assigned: this.assigned
                        }).then(()=>{
                            this.$message.success("成功分发任务");
                            this.$refs["task"].resetFields();
                        }).catch((reason)=>{
                            this.$message.error(reason);
                        });
                    }else{
                        this.$message.error("请选择受任者");
                    }
                    
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