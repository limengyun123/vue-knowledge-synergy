<template>
    <div>
        <el-row>
            <el-col :span="6" class="left-content">
                <div class="team-head">
                    <b>已加入的团队</b>
                    <el-dropdown class="team-add">
                        <span class="el-icon-circle-plus-outline" style="font-size: 1.5rem;"></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><router-link to="/common/team/createTeam">新建团队</router-link></el-dropdown-item>
                            <el-dropdown-item>加入团队</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div @click="handleCommand" class="my-teams">
                    <div v-for="team in myTeams" :key="team.tId" >
                        <div :index='team.tId' :class="['my-team', {selected: team.tId==teamChosenId}]">{{team.tName}}</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div v-if="teamChosenId">
                    <div v-for="project in myProjects" :key='project.pId'><p>{{project.pName}}</p></div>
                </div>
                <div v-else>
                    <div>empty</div>
                </div>
                <el-button type="primary" class='add-project-button'>新建项目</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getTeamsApi, getProjectsApi} from '../../api/team';

export default {
    name:"MyTeam",
    data(){
        return {
            teamChosenId: 0,
            myTeams:[],
            myProjects:[]
        }
    },
    mounted(){
        getTeamsApi(this.$store.state.userInfo.userName).then((result)=>{
            this.myTeams = result.data;
        }).catch((reason)=>{
             this.$message.error(reason);
        });
    },
    methods:{
        handleCommand(e) {
            let index = e.target.getAttribute("index");;
            if(index){
                this.teamChosenId = index;
                // 请求项目数据
                getProjectsApi(index).then((result)=>{
                    this.myProjects = result.data;
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
            }
		},
    }
}
</script>

<style scoped>
    .left-content{
        padding: 1rem;
    }

    .team-head{
        padding: 1rem 0.2rem;
        border-bottom: solid #dddddd 2px;
    }

    /* .right-content{

    } */
    .team-add{
        float: right;
    }

    .add-project-button{
        position: fixed;
        top: 5rem;
        right: 1.5rem;
    }
    .my-team{
        width:100%;
        height:3rem;
        line-height: 3rem;
        border-bottom: solid #dddddd 1px;
        padding: 0.2rem;
    }
    .my-teams .selected{
        background-color: #fafafa;
    }
</style>