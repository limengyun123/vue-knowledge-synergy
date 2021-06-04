<template>
    <div>
        <el-row class='todo-overview'>
            <el-col :span="12" class='todo-overview-left-half'>
                <div class='todo-overview-title'>团队任务</div>
                <div class='todo-overview-body'>
                    <!-- <div class='todo-overview-item'><p>重要任务</p><div class='blue-text'>{{task.important}}</div></div> -->
                    <div class='todo-overview-item'><p>紧急任务</p><div class='red-text'>{{task.urgent}}</div></div>
                    <div class='todo-overview-item'><p>非紧急任务</p><div class='green-text'>{{task.leisure}}</div></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class='todo-overview-title'>自建事项</div>
                <div class='todo-overview-body'>
                    <div class='todo-overview-item'><p>重要事项</p><div class='blue-text'>{{selfEvent.important}}</div></div>
                    <div class='todo-overview-item'><p>紧急事项</p><div class='red-text'>{{selfEvent.urgent}}</div></div>
                    <div class='todo-overview-item'><p>非紧急事项</p><div class='green-text'>{{selfEvent.leisure}}</div></div>
                </div>
            </el-col>
        </el-row>
        <div class='todo-detail'>
            <div class='todo-detail-title'>事件详情</div>
            <div>
                <div class='todo-detail-head'>
                    <label>时间选择:  </label>
                    <el-select v-model="chosenTime" placeholder="请选择" @change='changeTimeRange'>
                        <el-option v-for="item in timeOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="checkEvents" class='add-event-button'>新建事项</el-button>
                </div>
                <div class='todo-detail-body' @click="finishEvent">
                    <!-- 事件重要程度：a>b>c -->
                    <div v-for="item in toDoList" :key="item.taskId" class='todo-detail-item'>
                        <!-- <span :class="'el-icon-s-opportunity '+item.type"></span> -->
                        <span :index="item.taskId" class="el-icon-circle-check finish-event-icon"></span>
                        {{item.description}} <span class="todo-detail-time">{{item.deadline}}截止</span>
                    </div>
                </div>
            </div>
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
    </div>
</template>

<script>
import {getToDoOverviewApi, getToDoListApi,deleteToDoApi} from '../../api/individual'
export default {
    name: "ToDoList",
    data(){
        return {
            chosenTime: "所有",
            task: {},
            selfEvent: {},
            timeOptions:["近一周","近一月","近一年","所有"],
            toDoList:[],
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 10,
                pagerCount: 7
            },
        }
    },
    created(){
        getToDoOverviewApi().then((result)=>{
            this.task = result.data.task;
            this.selfEvent = result.data.selfEvent;
        }).catch((reason)=>{
            this.$message.error(reason);
        })
        this.getToDoList();
    },
    methods:{
        getToDoList(){
            getToDoListApi({
                timeOptions: this.chosenTime,
                currentPage: this.paginationInfo.currentPage,
                pageSize: this.paginationInfo.pageSize
            }).then((result)=>{
                this.toDoList = result.data;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
        changeTimeRange(e){
            this.getToDoList();
        },
        checkEvents(){
            this.$router.push('/common/individual/addEvent');
        },
        finishEvent(e){
            let index = e.target.getAttribute("index");
            if(index!=null){
                index = parseInt(index);
                deleteToDoApi({eventId:index}).then(()=>{
                    this.$message.success("已完成此待办事项");
                    this.getToDoList();
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
            }
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getResource();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getResource();
        },
    }
}
</script>

<style lang='less'>
@import "../../assets/css/common.less";

.todo-overview{
    width: 80%;
    margin: 2rem auto;
    padding: 2rem;
    border: #999999;
    border-radius: 1rem;
    box-shadow: #dddddd 0 0 .8rem;
    color: #555555;
}

.todo-overview-left-half{
    border-right: #dddddd 0.1rem solid;
}

.todo-overview-title{
    width: 100%;
    height: 2rem;
    border-bottom: #dddddd 0.1rem solid;
    font-size: large;
    text-align: center;
}

.todo-overview-body{
    display: flex;
    justify-content: space-evenly;
}

.todo-overview-item{
    width: 5rem;
    height: 7rem;
    text-align: center;
    color: #888888;
}

.todo-overview-item div{
    font-size: 3rem;
}

.blue-text{
    color: @brand-color;
}

.red-text{
    color: @danger-color;
}

.green-text{
    color: @success-color;
}

.finish-event-icon{
    margin: auto .5rem;
    font-size: 1.2rem;
    border-radius: 50%;
}

.finish-event-icon:hover{
    color: white;
    background-color: @support-color-ps;
}


.add-event-button{
    float: right;
}


.todo-detail{
    width: 94%;
    padding: 0 3%;
    color: #555555;
}

.todo-detail-title{
    font-size: 1.5rem;
    padding: 1rem;
    border-bottom: solid 0.1rem #aaaaaa;
}

.todo-detail-head{
    margin:1rem 3rem;
}

.todo-detail-body{
    padding: 1rem 3rem;
}

.todo-detail-item{
    border: solid 0.1rem #cccccc;
    margin: 0.8rem 0;
    padding: 1rem;
    border-radius: 1rem;
}

.todo-detail-time{
    float: right;
}

.el-icon-s-opportunity{
    margin-right: 1rem;
}

.a{
    color: @danger-color;
}
.b{
    color: @warning-color;
}
.c{
    color: @success-color;
}
</style>