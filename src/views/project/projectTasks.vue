<template>
    <div>
        <div class='task-overview-part'>
            <div class='task-overview-title'><h3>个人任务</h3></div>
            <div class='task-overview-body'>
                <div class='task-overview-item'>
                    <p>总任务</p><div class='blue-text'>{{taskOverviewIndividual.total}}</div>
                </div>
                <div class='task-overview-item'>
                    <p>已完成</p><div class='green-text'>{{taskOverviewIndividual.finished}}</div>
                </div>
                <div class='task-overview-item'>
                    <p>待完成</p><div class='yellow-text'>{{taskOverviewIndividual.unfinished}}</div>
                </div> 
                <div class='task-overview-item'>
                    <p>逾期</p><div class='red-text'>{{taskOverviewIndividual.overdue}}</div>
                </div>           
            </div>
            <div>
                <h3 class='task-detail-title'>任务详情</h3>
                <div class='task-detail-head'>
                    <label>选择查看方式:  </label>
                    <el-select v-model="chosenMethodIndividual" @change='changeMethodIndividual' class='task-select'>
                        <el-option label="待完成" :value="1"></el-option>
                        <el-option label="已完成" :value="2"></el-option>
                        <el-option label="逾期" :value="3"></el-option>
                        <el-option label="所有任务" :value="4"></el-option>
                    </el-select>
                </div>
                <div class='task-detail-body' @click="finishTask">
                    <div v-for="task in showedTasksIndividual" :key="task.taskId" :index="task.taskId" class='task-detail-item'>
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
            <el-button type="primary" v-if="getTeamAuth['TASK']" @click='checkTasks' class='check-task-button'>查看任务</el-button>
            <div class='task-overview-body'>
                <div class='task-overview-item'>
                    <p>总任务</p><div class='blue-text'>{{taskOverviewTeam.total}}</div>
                </div>
                <div class='task-overview-item'>
                    <p>已完成</p><div class='green-text'>{{taskOverviewTeam.finished}}</div>
                </div>
                <div class='task-overview-item'>
                    <p>待完成</p><div class='yellow-text'>{{taskOverviewTeam.unfinished}}</div>
                </div> 
                <div class='task-overview-item'>
                    <p>逾期</p><div class='red-text'>{{taskOverviewTeam.overdue}}</div>
                </div>           
            </div>

            <div>
                <h3 class='task-detail-title'>任务详情</h3>
                <div>
                    <div class='task-detail-head'>
                        <label>选择查看方式:  </label>
                        <!-- <el-select v-model="chosenMethodTeam" @change='changeMethodTeam' class='task-select'>
                            <el-option-group
                            v-for="group in checkMethods"
                            :key="group.label"
                            :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select> -->
                        <el-select v-model="chosenMethodTeam" @change='changeMethodTeam' class='task-select'>
                            <el-option v-for="item in checkMethods[0].options"
                                :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <!-- <div v-if="taskClassifierChosen" class='task-detail-body'> -->
                        <div class='task-detail-body'>
                            <div v-for="task in showedTasksTeam" :key="task.tId" class='task-detail-item'>
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
                        <!-- <div v-else>
                            <div v-for="(tasks,key,index) in showedTasksTeam" :key="index">
                                <p class='task-detail-individual-name'>{{key}}</p>
                                <div class='task-detail-body'>
                                    <div v-for="task in tasks" :key="task.tId" class='task-detail-item'>
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
                                            <div>> {{task.assigned}}</div>
                                        </div>                        
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {getTasksOverviewApi, getIndividualTasksDetailApi,getTeamTasksDetailApi} from '../../api/project';

export default {
    name: "ProjectTasks",
    data(){
        return {
            taskOverviewIndividual:{ total: 0, finished: 0, unfinished:0, overdue: 0 },
            taskOverviewTeam:{ total: 0, finished: 0, unfinished:0, overdue: 0 },
            chosenMethodIndividual: 1,
            chosenMethodTeam: 1,
            taskClassifierChosen: true,
            checkMethods: [
                {label: "按任务查看", options: [
                    {value: 4, label:"所有任务"}, {value: 2, label:"已完成的任务"}, 
                    {value: 1, label:"待完成的任务"}, {value: 3, label:"逾期的任务"}]
                }, 
                {label: "按人员查看", options: [
                    {value: 8, label:"所有人"}, {value: 6, label:"任务已完成的人"}, 
                    {value: 5, label:"任务未完成的人"}, {value: 7, label:"任务逾期的人"}]
                }
            ],
            showedTasksIndividual:[],
            showedTasksTeam:[]
        }
    },
    computed:{
        getProjectId(){ return this.$route.params.id; },
        getTeamAuth(){
            return this.$store.state.teamInfo.authority;
        }
    },
    created(){
        this.getTasksOverview();
        this.getIndividualTasksDetail();
        this.getTeamTasksDetail();
    },
    methods:{
        getTasksOverview(){
            getTasksOverviewApi({projectId: this.getProjectId}).then((result)=>{
                this.taskOverviewIndividual = result.data.personal;
                this.taskOverviewTeam = result.data.project;
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        getIndividualTasksDetail(){
            getIndividualTasksDetailApi({projectId:this.getProjectId, classifiedByTask: this.chosenMethodIndividual}).then((result)=>{
                this.showedTasksIndividual = result.data||[]; 
            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
        getTeamTasksDetail(){
            getTeamTasksDetailApi({projectId:this.getProjectId, classifiedByTask: this.chosenMethodTeam}).then((result)=>{
                this.showedTasksTeam = result.data||[]; 
                console.log(result.data);
            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
        checkTasks(){
            this.$router.push('/common/project/checkTasks/'+this.$route.params.id);
        },
        finishTask(e){
            
            let tg = e.target;
            let index = tg.getAttribute('index') || tg.parentNode.getAttribute('index') || tg.parentNode.parentNode.getAttribute('index');
            if(index!=null){
                index = parseInt(index);
                this.$store.commit('SET_TASK', this.getTaskById(index));
                this.$router.push('/common/project/finishTask/'+index);
            }
        },
        getTaskById(index){
            for(let item of this.showedTasksIndividual){
                if(item.taskId == index)
                    return item;
            }
            return {};
        },
        changeMethodIndividual(){
            this.getIndividualTasksDetail();
        },
        changeMethodTeam(e){
            if(e<5) this.taskClassifierChosen = true;
            else this.taskClassifierChosen = false;

            this.getTeamTasksDetail();
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

.check-task-button{
    float: right;
    margin: 1rem;
}

.task-overview-body{
    width: 80%;
    margin: 2rem auto;
    padding: 2rem;
    border: #dddddd;
    border-radius: 1rem;
    box-shadow: #dddddd 0 0 .8rem;
    color: #555555;
    display: flex;
    display: -webkit-flex; /* Safari */
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
    color: @brand-color;
}

.red-text{
    color: @danger-color;
}

.green-text{
    color: @success-color;
}

.yellow-text{
    color: @warning-color;
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
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap:wrap;
}

.task-detail-item{
    width: 20rem;
    border: solid .1rem #eeeeee;
    border-radius: .5rem;
    margin: 1rem .5rem;
    padding: 1rem;
    // background: #fcfafc;
    // background-image: linear-gradient(to right,@support-color-bg,#fefcfe, @support-color-bg);
    box-shadow: #dddddd 0 0 .6rem;
}

.task-detail-item:hover{
    border-color:@support-color-ps;
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
    margin-left: 3rem;
    border-left: @main-color solid .3rem;
    background-color: @support-color-bg ;
    padding: .5rem 1rem;
}


</style>