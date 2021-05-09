<template>
    <div class="team-page">
        <div v-if="myTeams.length">
            <transition name="fade-body">
                <div v-show="navShow" class="team-page-left">
                    <div class='team-chosen'>
                        <i @click="changeNavState" title="隐藏团队项目" class='el-icon-s-fold team-icon'></i>
                        <el-dropdown @command="handleCommand" placement="bottom-end">
                            <div>
                                <span class='team-chosen-name'>{{myTeams[teamChosenId-1].tName}}</span>
                                <i class="el-icon-arrow-down"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="team in myTeams" :key="team.tId" :command='team.tId'>
                                    <div>{{team.tName}}</div>
                                </el-dropdown-item>
                                <el-dropdown-item command='-1'>
                                    <router-link to="/common/team/createTeam">
                                        <span class="el-icon-circle-plus-outline"></span>
                                        <router-link to="/common/team/createTeam" class="team-chosen-link"> 新建团队</router-link>
                                         / <router-link to="/common/team/joinTeam" class="team-chosen-link">加入团队</router-link>
                                    </router-link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <router-link to="/common/team/editTeam"><span class="el-icon-edit team-icon" /></router-link>
                        <span class="el-icon-chat-dot-round team-icon" @click="chatWithTeam"/>
                    </div>
                    <div class="team-page-project-items" @click="handleProjectChosen">
                        <div v-for="project in myProjects" :key='project.pId' class='team-page-project' :index='project.pId'>
                            <span v-if="project.isFinised" class="el-icon-folder-checked"></span>
                            <span v-else class="el-icon-folder-opened"></span>
                            {{project.pName}}
                        </div>
                        <div class='team-page-project' :index='-1'>
                            <span class="el-icon-circle-plus-outline"></span> 新建项目
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="fade-supplement">
                <div v-show="!navShow" class="team-page-hide-nav">
                    <i @click="changeNavState" class='el-icon-s-unfold team-icon' title="展示团队项目"></i>
                    <span class="hide-text">{{getTeamName}}{{getProjectName}}</span>
                </div>
            </transition>
            </div>
        <div v-else class="team-page-no-data">
            <NoData />
            <div class="team-no-data-operate">
                <router-link to="/common/team/createTeam">新建</router-link>
                 / 
                <router-link to="/common/team/joinTeam">加入</router-link>
                团队
            </div>
        </div>
        <router-view class="team-page-center" />
        <div v-if="myTeams.length">
            <transition name="fade-member" mode="out-in">
                <div v-if="memberShow" class="team-page-right" key="right" @click="operateOnTeammates">
                    <i class="el-icon-s-unfold team-icon" title="隐藏队员" :index='-1'></i>
                    <div class="team-page-teammates" :index='0'>
                        <span class="el-icon-plus" :index='0'></span>
                    </div>
                    <div v-for="mate in myTeammates" :key="mate.id" class="team-page-teammates" :index="mate.id">
                        <span :index="mate.id">{{mate.actualName}}</span>
                    </div>
                </div>
                <div v-else class="teammates-supplement" key="right-supplement">
                    <i @click="changeMemberState" class="el-icon-s-fold team-icon" title="展示队员"></i>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import {getTeamsApi, getTeamInfoApi} from '../../api/team';
import NoData from '../../components/noData';

export default {
    name:"MyTeam",
    components:{
        'NoData': NoData,
    },
    data(){
        return {
            navShow:true,
            memberShow: true,
            teamChosenId: -1,
            projectChosenId: -1,
            myTeams:[],
            myTeammates:[],
            myProjects:[],
            timer: null // 单双击事件区分标志
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
        getTeamsApi(this.$store.state.userInfo.id).then((result)=>{
            this.myTeams = result.data;
            if(this.myTeams.length){
                if(this.$store.state.teamInfo.teamChosenI>0)
                    this.teamChosenId = this.$store.state.teamInfo.teamChosenId;
                else
                    this.teamChosenId = this.myTeams[0].tId;
                this.getTeamInfo();
            }
            
        }).catch((reason)=>{
            this.$message.error(reason);
        });

    },
    methods:{
        handleCommand(index) {
            if(index!=-1){
                this.teamChosenId = index;
                this.getTeamInfo();
            }
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
            let pId = parseInt(e.target.getAttribute('index'));
            if(pId!=null){
                pId = parseInt(pId);
                if(pId==-1)
                    this.$router.push('/common/team/createProject');
                else if(pId != this.projectChosenId){
                    this.projectChosen = e.target.innerText;
                    this.projectChosenId = pId;
                    this.$router.push('/common/team/project/'+pId);
                }
            }
        },
        chatWithTeam(){
            this.$store.commit('SET_CHAT_INFO',{isTeam: true, chatId: this.teamChosenId});
            this.$router.push('/common/message');
        },
        operateOnTeammates(e){
            let index = e.target.getAttribute('index');
            if(index!=null){
                index = parseInt(index);
                if(index > 0) {
                    if(this.timer==null){
                        this.timer = setTimeout(()=>{
                            clearTimeout(this.timer);
                            this.timer==null;
                            this.$router.push('/common/team/editTeammates');
                        }, 300);
                    }
                    else{
                        clearTimeout(this.timer);
                        this.timer=null;
                        // 与团队中某一成员聊天
                        this.$store.commit('SET_CHAT_INFO',{isTeam: false, chatId: index});
                        this.$router.push('/common/message');
                    }                   
                }
                else if(index===0) this.$router.push('/common/team/addTeammates');
                else this.changeMemberState();
            }
        },
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.team-page{
    display: flex;
    justify-content: space-between;
}
.team-page-left{
    width: 18rem; 
    border: #dddddd solid 0.1rem;
    box-shadow: #dddddd 0 0 .5rem;
    border-radius: 1rem;
    margin: 0.5rem;
    padding: 0.5rem;
    // background-color: @support-color-bg;
}

.team-page-center{
    flex:1;
}

.team-page-right{
    border: #dddddd solid 1px;
    border-radius: 1rem 0 0 1rem;     
    box-shadow: #dddddd 0 0 .5rem;
    text-align: center;
    max-height: 30rem;
    overflow: scroll;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
}

/* 无团队时的样式*/
.team-page-no-data{
    width: calc(100vw - 5rem);
    margin-top: 10rem;
    text-align: center;
}

.team-no-data-operate{
    width: 8rem;
    margin: auto;
    padding: 0.6rem 1rem;
    background-color: @support-color-ps;
    color: white;
    border: solid 0.1rem #dddddd;
    border-radius: 0.3rem;
}

.team-no-data-operate a{
    text-decoration: none;
    color: white;
}
.team-no-data-operate a:hover{
    color: @main-color;
}
.team-no-data-operate .router-link-active{
    text-decoration: none;
}
/* 无团队时的样式结束*/

/* 团队标题*/
.team-chosen{
    height: 2.9rem;
    border-bottom: solid 1px #aaaaaa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.team-chosen-link:hover{
    color: @main-color;
}

.team-icon{
    margin: 0.2rem;
    color: @support-color-ps;
    font-size: 1.4rem;
}

.team-chosen-name{
    display: inline-block;
    width: 10.8rem;
    font-size: 1.1rem;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.team-page-hide-nav{
    height: 4rem;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0.7rem;
    left: 6rem;
    z-index: 1;
}
.team-page-hide-nav .hide-text{
    color: #555555;
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 20rem;
}
/* 团队标题结束*/


/* 团队中项目list样式*/
.team-page-project-items{
    color:#888888;
    max-height: calc(100vh - 6rem);
    overflow: scroll;
}

.team-page-project{
    margin: 1.2rem 0.5rem;
    line-height: 1.2rem;
    font-size: 0.8rem;
}

.team-page-project .el-icon-folder-opened{
    font-size: 1.2rem;
    color:@brand-color;
}
.team-page-project .el-icon-folder-checked{
    font-size: 1.2rem;
    color:@success-color;
}

.team-page-project .el-icon-circle-plus-outline{
    font-size: 1.2rem;
    color:@warning-color;
}
/* 团队中项目list样式结束*/

.team-page-teammates{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin: .3rem 0.5rem;
    background-color: @support-color-ps;
    color:white;
    line-height: 3rem;
    font-size: .8rem;
}

.teammates-supplement{
    position: fixed;
    right: 0;
    top: 4rem;
}

/* 团队导航栏和队员动画 */ 
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
/* 团队导航栏和队员动画结束 */



/*修改dropdown的默认样式 */
.el-dropdown-menu__item a{
    text-decoration: none;
    color: #555555;
}
.el-dropdown-menu__item .router-link-active {
    text-decoration: none;
}
/*修改dropdown的默认样式结束 */
</style>