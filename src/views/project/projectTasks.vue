<template>
    <div>
        <div class='task-overview-body'>
            <div class='task-overview-item'>
                <p>总任务</p><div class='blue-text'>{{taskOverview.total}}</div>
            </div>
            <div class='task-overview-item'>
                <p>已完成</p><div class='green-text'>{{taskOverview.finished}}</div>
            </div>
            <div class='task-overview-item'>
                <p>逾期已完成</p><div class='yellow-text'>{{taskOverview.finishedOverdue}}</div>
            </div> 
            <div class='task-overview-item'>
                <p>逾期未完成</p><div class='red-text'>{{taskOverview.overdue}}</div>
            </div>           
        </div>

        <div>
            <div class='task-detail-title'>任务详情</div>
            <div>
                <div class='task-detail-head'>
                    <label>选择查看方式:  </label>
                    <el-select v-model="chosenMethod" placeholder="请选择" @change='changeMethod'>
                        <el-option-group
                        v-for="group in checkMethods"
                        :key="group.label"
                        :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-option-group>
                    </el-select>

                </div>
                <div class='task-detail-body'>
                    <div v-if="taskClassifierChosen">
                        <div v-for="task in showedTasks" :key="task.tId" class='task-detail-item'>
                            <span :class="'el-icon-s-opportunity '+task.type"></span>
                            <span>{{task.content}}</span>
                            <span>指派人：{{task.assigner}}</span>
                            <span>受任者：{{task.assigned}}</span>
                            <span>开始时间{{task.startTime}}</span>
                            <span>结束时间{{task.endTime}}</span>
                        </div>
                    </div>
                    <div v-else>
                        <div v-for="taskOfPerson in getTaskOfPerson" :key="taskOfPerson.uId">
                            <p>{{taskOfPerson.assigned}}</p>
                            <div v-for="task in taskOfPerson.tasks" :key="task.tId"  class='task-detail-item'>
                                <span :class="'el-icon-s-opportunity '+task.type"></span>
                                <span>{{task.content}}</span>
                                <span>指派人：{{task.assigner}}</span>
                                <span>开始时间{{task.startTime}}</span>
                                <span>结束时间{{task.endTime}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "ProjectTasks",
    data(){
        return {
            taskOverview:{
                total: 22,
                finished: 16,
                finishedOverdue:2,
                overdue: 1
            },
            chosenMethod: "所有任务",
            taskClassifierChosen: true,
            checkMethods: [
                {label: "按任务查看", options: ["所有任务", "按时完成的任务", "逾期完成的任务", "未逾期未完成的任务", "逾期未完成的任务"]}, 
                {label: "按人员查看", options: ["所有人", "按时完成任务的人", "逾期完成任务的人", "未逾期未完成的任务", "逾期未完成任务的人"]}
            ],
            myTasks:[
                // type 1：已完成 2：未逾期未完成 3：逾期已完成 4：逾期未完成
                {tId:1, type:"a", assigner:"吴名", assigned: "钱全有", uId:3143, startTime:"2021-02-22 16:45", endTime:"2021-03-02 12:00", content: "完成项目的市场调研"},
                {tId:2, type:"b", assigner:"吴名", assigned: "钱全有", uId:3143, startTime:"2021-02-22 16:47", endTime:"2021-03-22 12:00", content: "完成项目的市场调研"},
                {tId:3, type:"c", assigner:"吴名", assigned: "钱全有", uId:3143, startTime:"2021-02-22 16:49", endTime:"2021-03-12 12:00", content: "完成项目的市场调研"},
                {tId:4, type:"d", assigner:"吴名", assigned: "赵浩", uId:42345, startTime:"2021-02-22 16:50", endTime:"2021-03-14 12:00", content: "完成项目的市场调研"},
            ],
            showedTasks:[]
        }
    },
    created(){
        console.log(this.$route.params.id);
        this.showedTasks = this.myTasks;
    },
    computed:{
        getTaskOfPerson(){
            return [
                {
                    uId: 3143,
                    assigned: "钱全有",
                    tasks:[
                        {tId:1, type:"a", assigner:"吴名", assigned: "钱全有", uId:3143, startTime:"2021-02-22 16:45", endTime:"2021-03-02 12:00", content: "完成项目的市场调研"},
                        {tId:2, type:"b", assigner:"吴名", assigned: "钱全有", uId:3143, startTime:"2021-02-22 16:47", endTime:"2021-03-22 12:00", content: "撰写调研报告"},
                        {tId:3, type:"c", assigner:"吴名", assigned: "钱全有", uId:3143, startTime:"2021-02-22 16:49", endTime:"2021-03-12 12:00", content: "分析项目的可行性"},
                    ]
                },
                {
                    uId: 42345,
                    assigned: "赵浩",
                    tasks:[
                        {tId:4, type:'d', assigner:"吴名", assigned: "赵浩", uId:42345, startTime:"2021-03-12 16:50", endTime:"2021-03-14 12:00", content: "完成项目的任务书"},
                    ]
                },
            ];
        },

    },
    methods:{
        changeMethod(e){
            switch(e){
                case "所有任务":
                    this.taskClassifierChosen = true;
                    this.showedTasks = this.myTasks; 
                    break;
                case "按时完成的任务":
                    this.taskClassifierChosen = true;
                    this.showedTasks = this.myTasks.slice(0,1); 
                    break;
                case "逾期完成的任务":
                    this.taskClassifierChosen = true;
                    this.showedTasks = this.myTasks.slice(1,2); 
                    break;
                case "未逾期未完成的任务":
                    this.taskClassifierChosen = true;
                    this.showedTasks = this.myTasks.slice(2,3); 
                    break;
                case "逾期未完成的任务":
                    this.taskClassifierChosen = true;
                    this.showedTasks = this.myTasks.slice(3,4); 
                    break;
                default:
                    this.taskClassifierChosen = false;
                    break;
            }
            console.log(e);
        }
    }
}
</script>

<style scoped>
.task-overview-body{
    width: 80%;
    margin: 2rem auto;
    padding: 2rem;
    border: #999999;
    border-radius: 2rem;
    box-shadow: #bbbbbb 0 0 0.3rem;
    color: #555555;
    display: flex;
    justify-content: space-evenly;
}
.task-overview-item{
    width: 5rem;
    height: 7rem;
    text-align: center;
    color: #888888;
}


.task-overview-item div{
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

.yellow-text{
    color: yellow;
}

.todo-detail{
    width: 94%;
    padding: 0 3%;
    color: #555555;
}

.task-detail-title{
    font-size: 1.5rem;
    padding: 1rem;
    border-bottom: solid 0.1rem #aaaaaa;
}

.task-detail-head{
    margin:1rem 3rem;
}

.task-detail-body{
    padding: 1rem 3rem;
}

.task-detail-item{
    border: solid 0.1rem #cccccc;
    margin: 0.8rem 0;
    padding: 1rem;
    border-radius: 1rem;
}

.el-icon-s-opportunity{
    margin-right: 1rem;
}

.a{
    color: lightblue;
}
.b{
    color: lightgreen;
}
.c{
    color: yellow;
}
.d{
    color: red;
}
</style>