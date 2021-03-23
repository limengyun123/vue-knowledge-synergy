<template>
    <div class="team-layout">
        <transition name="fade-body">
            <div v-show="navShow" class="left">
                <i @click="changeNavState" class='el-icon-s-fold'></i>
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
                    <div class="project-items" @click="handleProjectChosen">
                        <div v-for="project in myProjects" :key='project.pId' class='team-project' :index='project.pId'>
                            {{project.pName}}
                            <!-- <router-link :to="'/common/team/project/'+project.pId">{{project.pName}}</router-link> -->
                        </div>
                        <div class='team-project'>
                            <span class="el-icon-circle-plus-outline"></span> 新建项目
                            <!-- <router-link :to="'/common/team/createProject/'+teamChosenId"></router-link> -->
                        </div>
                    </div>
                </div>
                <div v-else>
                    <button icon="el-icon-circle-plus-outline">新建/加入团队</button>
                </div>
                
            </div>
        </transition>
        <transition name="fade-supplement">
            <div v-show="!navShow" class="hide-nav">
                <i @click="changeNavState" class='el-icon-s-unfold'></i>
                <span class="hide-text">{{getTeamName}}{{getProjectName}}</span>
            </div>
        </transition>
        <div class="center">
            <router-view />
        </div>
        <transition name="fade-member" mode="out-in">
            <div v-if="memberShow" class="right" key="right">
                <i @click="changeMemberState" class="el-icon-s-unfold"></i>
                <router-link :to="'/common/team/addTeammates/'+teamChosenId"><el-avatar :size="50" icon="el-icon-plus"></el-avatar></router-link>
                <el-avatar v-for="mate in myTeammates" :key="mate.userName" :size="50">{{mate.actualName}}</el-avatar>
            </div>
            <div v-else class="right-supplement" key="right-supplement">
                <i @click="changeMemberState" class="el-icon-s-fold"></i>
            </div>
        </transition>
    </div>
</template>

<script>
import {getTeamsApi, getTeamInfoApi} from '../../api/team';

export default {
    name:"MyTeam",
    data(){
        return {
            navShow:true,
            memberShow: true,
            teamChosenId: -1,
            projectChosenId: -1,
            myTeams:[],
            myTeammates:[],
            myProjects:[]
        }
    },
    computed:{
        getTeamName(){
            for(let item of this.myTeams){
                if(item.tId==this.teamChosenId)
                    return item.tName;
            }
            return null;
        },
        getProjectName(){
            for(let item of this.myProjects){
                if(item.pId==this.projectChosenId)
                    return '/'+item.pName;
            }
            return null;
        },
    },
    created(){

        getTeamsApi(this.$store.state.userInfo.userName).then((result)=>{
            this.myTeams = result.data;
            if(this.myTeams.length){
                if(this.$store.state.teamChosenId==null)
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
                this.$store.commit('SET_TEAMMATES', this.myTeammates);
            }).catch((reason)=>{
                this.$message.error(reason);
            });
        },
        changeNavState(){
            this.navShow = !this.navShow;
        },
        changeMemberState(){
            this.memberShow = !this.memberShow;
        },
        handleProjectChosen(e){
            let pId = e.target.getAttribute('index');
            if(!pId){
                this.$router.push('/common/team/createProject/'+this.teamChosenId);
            }
            else if(pId != this.projectChosenId){
                this.projectChosen = e.target.innerText;
                this.projectChosenId = pId;
                this.$router.push('/common/team/project/'+pId);
            }
            
        }
    }
}
</script>

<style scoped>
    .team-layout{
        display: flex;
    }
    .left{
        width: 16rem; 
    }


    .hide-nav{
        position: absolute;
        z-index: 1;
    }
    .hide-text{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width: 20rem;
    }
    .center{
        flex:1;
        min-width: 40rem;
    }

    .right{
        width: 5rem;
        background-color: #fafafa;
        border: #dddddd solid 1px;
        border-radius: 1rem 0 0 1rem;     
        text-align: center;
        max-height: 30rem;
        overflow: scroll;
        margin-top: 4rem;
    }

    .right-supplement{
        position: fixed;
        top: 30rem;
        right: 0;
    }

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

    .project-items{
        height: calc(99vh - 5rem);
        overflow: scroll;
    }

    .team-project{
        width: 80%;
        padding: 1rem 8%;
        height: 2rem;
        list-style:none;
        border-bottom: solid 0.1rem #dddddd;
    }

    .right .el-avatar{
        margin: 0.3rem 0;
        background: #33CCFF;
    }

    .el-icon-s-fold,.el-icon-s-unfold{
        font-size: 2rem;
        color: lightblue;
    }
    .fade-body-enter-active, .fade-supplement-enter-active ,.fade-body-leave-active,
    .fade-supplement-leave-active, .fade-member-enter-active, .fade-member-leave-active {
        transition: all .3s ;
    }

    .fade-body-enter, .fade-body-leave-to,.fade-supplement-enter, .fade-supplement-leave-to {
        transform: translateX(-1rem);
        opacity: 0;
    }


    .fade-member-enter, .fade-member-leave-to{
        opacity: 0;
    }

</style>