<template>
    <div>
        <div class='task-overview-part'>
            <div class='task-overview-title'><h3>个人任务</h3></div>
            <div class='task-overview-body'>
                <div class='task-overview-item'>
                    <p>总任务</p><div class='blue-text'>{{taskOverview.total}}</div>
                </div>
                <div class='task-overview-item'>
                    <p>已完成</p><div class='green-text'>{{taskOverview.finished}}</div>
                </div>
                <div class='task-overview-item'>
                    <p>待完成</p><div class='yellow-text'>{{taskOverview.finishedOverdue}}</div>
                </div> 
                <div class='task-overview-item'>
                    <p>逾期</p><div class='red-text'>{{taskOverview.overdue}}</div>
                </div>           
            </div>
            <div>
                <h3 class='task-detail-title'>任务详情</h3>
                <div class='task-detail-head'>
                    <label>选择查看方式:  </label>
                    <el-select v-model="chosenMethodIndividual" placeholder="请选择" @change='changeMethod'>
                        <el-option label="未完成" :value="1"></el-option>
                        <el-option label="已完成" :value="2"></el-option>
                        <el-option label="逾期" :value="3"></el-option>
                        <el-option label="所有任务" :value="4"></el-option>
                    </el-select>
                </div>
                <div class='task-detail-body'>
                    <div v-for="task in showedTasks" :key="task.tId" class='task-detail-item'>
                        <div class='task-detail-item-info'>
                            <div>{{task.startTime}}</div>
                            <div class='content-dash'></div>
                            <div class='el-icon-time'></div>
                            <div class='content-dash'></div>
                            <div>> {{task.endTime}}</div>
                        </div>
                        <div class="task-detail-item-content">{{task.content}}</div>
                        <div class='task-detail-item-info'>
                            <div>{{task.assigner}}</div>
                            <div class='content-dash'></div>>
                            <div class='el-icon-message'></div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>

        <div class='task-overview-part'>
            <div class='task-overview-title'><h3>团队任务</h3></div>
            <ButtonPrimary @buttonClick='addTask' class='assign-task-button'>添加任务</ButtonPrimary>
            <div class='task-overview-body'>
                <div class='task-overview-item'>
                    <p>总任务</p><div class='blue-text'>{{taskOverview.total}}</div>
                </div>
                <div class='task-overview-item'>
                    <p>已完成</p><div class='green-text'>{{taskOverview.finished}}</div>
                </div>
                <div class='task-overview-item'>
                    <p>待完成</p><div class='yellow-text'>{{taskOverview.finishedOverdue}}</div>
                </div> 
                <div class='task-overview-item'>
                    <p>逾期</p><div class='red-text'>{{taskOverview.overdue}}</div>
                </div>           
            </div>

            <div>
                <h3 class='task-detail-title'>任务详情</h3>
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
                                <div class='task-detail-item-info'>
                                    <div>{{task.startTime}}</div>
                                    <div class='content-dash'></div>
                                    <div class='el-icon-time'></div>
                                    <div class='content-dash'></div>
                                    <div>> {{task.endTime}}</div>
                                </div>
                                <div class="task-detail-item-content">{{task.content}}</div>
                                <div class='task-detail-item-info'>
                                    <div>{{task.assigner}}</div>
                                    <div class='content-dash'></div>
                                    <div class='el-icon-message'></div>
                                    <div class='content-dash'></div>
                                    <div>> {{task.assigned}}</div>
                                </div>                        
                            </div>
                        </div>
                        <div v-else>
                            <div v-for="taskOfPerson in getTaskOfPerson" :key="taskOfPerson.uId">
                                <p class='task-detail-individual-name'>{{taskOfPerson.assigned}}</p>
                                <div v-for="task in showedTasks" :key="task.tId" class='task-detail-item'>
                                    <div class='task-detail-item-info'>
                                        <div>{{task.startTime}}</div>
                                        <div class='content-dash'></div>
                                        <div class='el-icon-time'></div>
                                        <div class='content-dash'></div>
                                        <div>> {{task.endTime}}</div>
                                    </div>
                                    <div class="task-detail-item-content">{{task.content}}</div>
                                    <div class='task-detail-item-info'>
                                        <div>{{task.assigner}}</div>
                                        <div class='content-dash'></div>>
                                        <div class='el-icon-message'></div>
                                    </div>                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../../components/buttonPrimary';

export default {
    name: "ProjectTasks",
    components:{
        "ButtonPrimary": ButtonPrimary
    },
    data(){
        return {
            taskOverview:{
                total: 22,
                finished: 16,
                finishedOverdue:2,
                overdue: 1
            },
            chosenMethodIndividual: 1,
            chosenMethod: "所有任务",
            taskClassifierChosen: true,
            checkMethods: [
                {label: "按任务查看", options: ["所有任务", "已完成的任务", "待完成的任务", "逾期的任务"]}, 
                {label: "按人员查看", options: ["所有人", "任务已完成的人", "任务未完成的人", "任务逾期的人"]}
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
        addTask(){
            this.$router.push('/common/project/assignTask/'+this.$route.params.id);
        },
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
        }
    }
}
</script>

<style lang='less'>
@import "../../assets/css/common.less";

.task-overview-part{
    margin: 0 auto 5rem;
}
.task-overview-title{
    border-left: @main-color solid .5rem;
    background-color: @support-color-bg ;
    padding: .1rem 1rem;
}

.assign-task-button{
    float: right;
}

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
    color: #409EFF;
}

.red-text{
    color: #F56C6C;
}

.green-text{
    color: #67C23A;
}

.yellow-text{
    color: #E6A23C;
}

.todo-detail{
    width: 94%;
    padding: 0 3%;
    color: #555555;
}

.task-detail-title{
    width: 94%;
    margin: 0 3%;
    padding: .5rem;
    border-bottom: solid 0.1rem #aaaaaa;
}

.task-detail-head{
    margin:1rem 3rem;
}

.task-detail-body{
    padding: 0 3rem;
}

.task-detail-item{
    border: solid .1rem #eeeeee;
    border-radius: .5rem;
    margin: 2rem 0;
    padding: 1rem;
    background: #fcfafc;
    background-image: linear-gradient(to right,@support-color-bg,#fefcfe, @support-color-bg);
    // background-size: cover;
    // background-repeat: no-repeat;
    // background-position: center center;
}

.task-detail-item-content{
    color: #555555;
    line-height: 1.5rem;
    margin: 1rem 2rem;
}

.task-detail-item-info{
    display: flex;
    color: #888888;
    font-size: .7rem;
}


.task-detail-item-info .content-dash{
    flex:1;
    height: .4rem;
    border-bottom: dashed 0.1rem;
    margin :0 .4rem
}

.task-detail-item-info .el-icon-time, .el-icon-message{
    font-size: 1rem;
}

.task-detail-individual-name{
    border-left: @main-color solid .3rem;
    background-color: @support-color-bg ;
    padding: .5rem 1rem;
}

</style>