<template>
    <div>
        <GoBackHead />
        <el-button type="primary" @click='addTask' class='assign-task-button'>添加任务</el-button>
        <el-table :data="tasks" class="my-tasks-table">
                <el-table-column prop="assigned" label="受任者" width="80"> </el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <!-- <el-table-column prop="status" label="状态" width="50">
                    <span v-if="scope.row.status===0">未开始</span>
                    <span v-else-if="scope.row.status===1">执行中</span>
                    <span v-else-if="scope.row.status===2">已完成</span>
                    <span v-else>逾期</span>
                </el-table-column> -->
                <el-table-column prop="startTime" label="开始时间" width="200"> </el-table-column>
                <el-table-column prop="endTime" label="截止时间" width="150"> </el-table-column>
                <el-table-column fixed="right" label="详情" width="60">
                    <template slot-scope="scope">
                        <span class="el-icon-delete" :index="scope.row.tId" @click="handleClick"></span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="paginationInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationInfo.totalNum"
            :pager-count="paginationInfo.paperCount"
            hide-on-single-page
        >
        </el-pagination>
    </div>
</template>

<script>
import GoBackHead from '../../components/goBackHead';
import {getMyTasksApi, deleteMyTaskApi} from '../../api/project';

export default {
    name: "CheckTasks",
    components:{
        "GoBackHead": GoBackHead,
    },
    data(){
        return {
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 10,
                pagerCount: 7
            },
            tasks:[]
        }
    },
    created(){
        this.getTasks();
    },
    methods:{
        getTasks(){
            getMyTasksApi(this.paginationInfo).then((result)=>{
                this.tasks = result.data.tasks;
                this.paginationInfo.totalNum = result.data.totalNum;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
        handleClick(e){
            let index = e.target.getAttribute("index");
            if(index){
                console.log(index);
                deleteMyTaskApi({tId: index}).then(()=>{
                    this.deleteTaskFromMemory(index);
                    this.paginationInfo.totalNum-=1;
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
            }
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getTasks();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getTasks();
        },
        deleteTaskFromMemory(id){
            this.tasks = this.tasks.filter((task)=>{
                return task.tId!=id;
            })
        },
        addTask(){
            this.$router.push('/common/project/assignTask/'+this.$route.params.id);
        },
        
    }
}
</script>

<style>

.assign-task-button{
    float: right;
    margin: 2rem;
}

.my-tasks-table{
    box-shadow: #dddddd 0 0 0.4rem;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 2rem;
}
</style>