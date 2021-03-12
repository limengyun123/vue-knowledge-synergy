<template>
    <div>
        <el-row>
            <el-col :span="6" class="left">
                <div v-if="myTeams.length">
                    <el-dropdown @command="handleCommand" placement="bottom-end">
                        <div class='team-chosen'>{{myTeams[teamChosenId-1].tName}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                            <router-link :to="'/common/team/editTeam/'+teamChosenId"><span class="el-icon-edit el-icon--right" /></router-link>
                        </div>
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item v-for="team in myTeams" :key="team.tId" :command='team.tId'>
                                <div :class="['my-team', {selected: team.tId==teamChosenId}]">{{team.tName}}</div>
                            </el-dropdown-item>
                            <el-dropdown-item command='-1'>
                                <router-link to="/common/team/createTeam">
                                    <span class="el-icon-circle-plus-outline"></span> 新建/加入团队
                                </router-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div class="project-items">
                        <div v-for="project in myProjects" :key='project.pId' class='team-project'>
                            <router-link :to="'/common/team/project/'+project.pId">{{project.pName}}</router-link>
                        </div>
                        <div class='team-project'>
                            <router-link :to="'/common/team/createProject/'+teamChosenId"><span class="el-icon-circle-plus-outline"></span> 新建项目</router-link>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <button icon="el-icon-circle-plus-outline">新建/加入团队</button>
                </div>
            </el-col>
            <el-col :span="16">
                <router-view />
            </el-col>
            <el-col :span="2">
                <div class='team-mates'>
                    <router-link :to="'/common/team/addTeammates/'+teamChosenId"><el-avatar :size="50" icon="el-icon-plus"></el-avatar></router-link>
                    <el-avatar v-for="mate in myTeammates" :key="mate.userName" :size="50">{{mate.actualName}}</el-avatar>
                    <!-- <el-avatar :size="50">...</el-avatar> -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getTeamsApi, getTeamInfoApi} from '../../api/team';

export default {
    name:"MyTeam",
    data(){
        return {
            teamChosenId: -1,
            myTeams:[],
            myTeammates:[],
            myProjects:[]
        }
    },
    created(){

        getTeamsApi(this.$store.state.userInfo.userName).then((result)=>{
            this.myTeams = result.data;
            if(this.myTeams.length){
                if(this.$store.state.teamChosenId==-1)
                    this.teamChosenId = this.myTeams[0].tId;
                else
                    this.teamChosenId = this.$store.state.teamChosenId;
                this.getTeamInfo();
            }
            
        }).catch((reason)=>{
            this.$message.error(reason);
        });

    },
    methods:{
        handleCommand(index) {
            console.log(index);
            this.teamChosenId = index;
            this.getTeamInfo();
            // this.$store.commit('SET_TEAMCHOSENID', this.teamChosenId);
		},
        getTeamInfo(){
            this.$store.commit('SET_TEAMCHOSENID', this.teamChosenId);
            // 请求项目数据
            getTeamInfoApi(this.teamChosenId).then((result)=>{
                this.myProjects = result.data.projects;
                this.myTeammates = result.data.teammates;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
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

    .project-items{
        height: calc(99vh - 4rem);
        overflow: scroll;
    }

    .team-project{
        width: 80%;
        margin: 1rem 10%;
        height: 2rem;
    }

    .team-mates{
        position: fixed;
        right: 0;
        top: 4rem;
        float: right;
        width: 5rem;
        background-color: #fafafa;
        border: #dddddd solid 1px;
        border-radius: 1rem 0 0 1rem;     
        text-align: center;
        max-height: 30rem;
        overflow: scroll;
    }
    .team-mates .el-avatar{
        margin: 0.3rem 0;
        background: #33CCFF;
    }
</style>