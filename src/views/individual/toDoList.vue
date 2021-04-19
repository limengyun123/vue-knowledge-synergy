<template>
    <div>
        <el-row class='todo-overview'>
            <el-col :span="12" class='todo-overview-left-half'>
                <div class='todo-overview-title'>团队任务</div>
                <div class='todo-overview-body'>
                    <div class='todo-overview-item'><p>重要任务</p><div class='blue-text'>{{task.important}}</div></div>
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
                </div>
                <div class='todo-detail-body'>
                    <!-- 事件重要程度：a>b>c -->
                    <div v-for="item in toDoList" :key="item.eId" class='todo-detail-item'>
                        <span :class="'el-icon-s-opportunity '+item.type"></span>
                        {{item.description}} {{item.startTime}}->{{item.deadline}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getToDoOverviewApi, getToDoListApi} from '../../api/individual'
export default {
    name: "ToDoList",
    data(){
        return {
            chosenTime: "所有",
            task: {},
            selfEvent: {},
            timeOptions:["近一周","近半月","近一月","近三月","近一年","所有"],
            toDoList:[
                {eId: 1, startTime: '2020-03-02', deadline: '2020-03-04', type: 'b', description: '完成待办事项界面设计'},
                {eId: 2, startTime: '2020-03-02', deadline: '2020-03-7', type: 'c', description: '完成开题报告'},
                {eId: 3, startTime: '2020-03-02', deadline: '2020-6-20', type: 'a', description: '考驾照'},
                {eId: 4, startTime: '2020-03-02', deadline: '2020-6-20', type: 'b', description: '准备生日礼物，并于阴历4月20送出'},
                {eId: 5, startTime: '2020-03-03', deadline: '2020-07-01', type: 'a', description: '再次参观武汉市植物园'},
                {eId: 6, startTime: '2020-03-03', deadline: '2020-03-07', type: 'b', description: '和室友吃韩式料理'},
            ]
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
            getToDoListApi(this.chosenTime).then((result)=>{
                this.toDoList = result.data;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
        changeTimeRange(e){
            this.getToDoList();
        }
    }
}
</script>

<style scoped>
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
    color: lightblue;
}

.red-text{
    color: red;
}

.green-text{
    color: lightgreen;
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

.el-icon-s-opportunity{
    margin-right: 1rem;
}

.a{
    color: red;
}
.b{
    color: orange;
}
.c{
    color: green;
}
</style>