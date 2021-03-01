<template>
    <div>
        <el-row>
            <el-col :span="6" class="left">
                <div v-if="myTeams.length">
                    <el-dropdown @command="handleCommand">
                        <div class='team-chosen'>{{myTeams[teamChosenId-1].tName}}<i class="el-icon-arrow-down el-icon--right"></i></div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="team in myTeams" :key="team.tId" :command='team.tId'>
                                <div :class="['my-team', {selected: team.tId==teamChosenId}]">{{team.tName}}</div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div>
                        
                        <div v-for="project in myProjects" :key='project.pId' class='team-project'>
                            <router-link :to="'/common/team/project/'+project.pId">{{project.pName}}</router-link>
                        </div>
                        <div class='team-project'>
                            <router-link to="/common/team/createProject"><span class="el-icon-circle-plus-outline"></span> 新建项目</router-link>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <button icon="el-icon-circle-plus-outline">新建/加入团队</button>
                </div>
            </el-col>
            <el-col :span="18">
                <router-view />
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
            teamChosenId: -1,
            myTeams:[],
            myProjects:[]
        }
    },
    mounted(){
        getTeamsApi(this.$store.state.userInfo.userName).then((result)=>{
            this.myTeams = result.data;
            if(this.myTeams.length){
                this.teamChosenId = this.myTeams[0].tId;
                console.log(this.teamChosenId);
                this.getTeamProject();
            }
            console.log("this.teamChosenId",this.teamChosenId);
            
        }).catch((reason)=>{
            this.$message.error(reason);
        });

    },
    methods:{
        handleCommand(index) {
            console.log(index);
            this.teamChosenId = index;
            this.getTeamProject();
            // this.$store.commit('SET_TEAMCHOSENID', this.teamChosenId);
		},
        getTeamProject(){
            // 请求项目数据
            getProjectsApi(this.teamChosenId).then((result)=>{
                console.log(result.data);
                this.myProjects = result.data;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
        }
    }
}
</script>

<style scoped>

    .team-chosen{
        margin: 1rem 0.5rem;
        text-align: center;
        font-size: 1.2rem;
        width: 100%;
    }
    
    .team-add{
        float: right;
    }


    .my-team{
        width:100%;
        height: 2rem;
        line-height: 2rem;
        padding: 0.2rem;
    }
    .my-teams .selected{
        background-color: #fafafa;
    }

    .team-project{
        width: 80%;
        margin: 1rem 10%;
        height: 2rem;
    }
</style>