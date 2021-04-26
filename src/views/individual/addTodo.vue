<template>
    <div>
        <GoBackHead />
        <el-form :model="todo" ref="todo" status-icon :rules="rules" label-width="100px" class="assign-todo-body">
            <el-form-item label="是否紧急" prop="isImportant">
                <el-radio v-model="todo.isImportant" :label="true">是</el-radio>
                <el-radio v-model="todo.isImportant" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="截止时间" prop="deadline">
                <el-date-picker v-model="todo.deadline" type="datetime" placeholder="选择日期时间"> </el-date-picker>
            </el-form-item>
            <el-form-item label="描述" prop="content">
                <el-input type="textarea" v-model="todo.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="submit-button" @click="submitTodo">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import GoBackHead from '../../components/goBackHead';
import {addTodoApi} from '../../api/individual';

export default {
    name: "AddTodo",
    components:{
        'GoBackHead': GoBackHead
    },
    data(){
        return {
            mates:[],
            todo:{
                isImportant: false,
                deadline: '',
                content: '',
            },
            rules:{
                isImportant:{ required: true, message: "请选择事件是否紧急", trigger: 'blur' },
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
                ],
                content:[
                    { required: true, message: "请对事件加以描述", trigger: 'blur' },
                    { min: 1, max: 500, message: "请输入1-500个字符", trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        submitTodo(){
            this.$refs['todo'].validate((valid)=>{
                if(valid){
                    //console.log(this.todo);
                    addTodoApi(this.todo).then((result)=>{
                        this.$message.success("成功新建事项");
                        this.$refs["todo"].resetFields();
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    })
                }
            })
        }
    }
}
</script>

<style>
.assign-todo-body{
    width: 30rem;
    margin: 2rem auto;
}

.submit-button{
    margin: 0 40%;
}
</style>