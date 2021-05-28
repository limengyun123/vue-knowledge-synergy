<template>
    <div>
        <GoBackHead />
        <div class="join-team-body">
            <el-form :model="joinInfo" status-icon ref="joinInfo" :rules="infoRules" label-width="100px">
                <el-form-item label="团队名称" prop="searchInput">
                    <el-input v-model="joinInfo.searchInput" placeholder="请输入团队名称">
                        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                    </el-input>    
                    <div class='searched-team-list' @click="handleTeamChosen">
                        <transition-group name="searched-teams">
                            <div v-for="team in searchedTeams" :key="team.teamId" :index="team.teamId" class='searched-team-item'>
                                <div class='searched-team-name'>{{team.teamName}}</div>
                                <div>(队长: {{team.leaderName}})</div>
                            </div>
                        </transition-group>
                    </div>
                </el-form-item>
                <el-form-item label="申请理由" prop="joinReason">
                    <el-input type="textarea" v-model="joinInfo.joinReason"></el-input>
                </el-form-item>
                <el-form-item>
                    <button class="join-team-submit" @click="handleJoinRequest">申请加入</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {searchTeamsApi, joinTeamApi} from '../../api/team';
import GoBackHead from '../../components/goBackHead';

export default {
    name: "JoinTeam",
    components:{
        'GoBackHead': GoBackHead,
    },
    data(){
        return {
            joinInfo:{
                searchInput: '',
                joinReason: ''
            },
            infoRules:{
                searchInput:{ required:true, message: '请选择团队', trigger: onblur },
                joinReason:[
                    { required:true, message: '请输入申请理由', trigger: onblur },
                    { min: 1, max: 200, message: "请输入1-200个字符", trigger: onblur}
                ]
            },
            teamChosen: -1,
            searchedTeams: []
        }
    },
    methods:{
        handleSearch(){
            let content = this.joinInfo.searchInput.trim();
            if(content!=''){
                searchTeamsApi({input: content}).then((result)=>{
                    if(result.data.length==0) this.$message.info("未搜索到团队");
                    else this.searchedTeams = result.data;
                }).catch((reason)=>{
                    this.$message.error(reason);
                })
            }
            else{
                this.searchedTeams=[];
            }
        },
        handleTeamChosen(e){
            let tId = e.target.getAttribute('index')||e.target.parentNode.getAttribute('index');
            console.log(tId);
            if(tId){
                tId = parseInt(tId);
                this.joinInfo.searchInput = this.getTeamNameById(tId);
                this.teamChosen = tId;
                this.searchedTeams = [];
                console.log(tId);
            }
        },
        getTeamNameById(tId){
            for(let team of this.searchedTeams){
                if(team.teamId==tId){
                    return team.teamName;
                }
            }
            return '';
        },
        handleJoinRequest(e){
            e.preventDefault();
            this.$refs["joinInfo"].validate((valid)=>{
                if(valid){
                    if(this.teamChosen!=-1)
                        joinTeamApi({teamId: this.teamChosen, reason: this.joinInfo.joinReason}).then((result)=>{
                            this.$message({
                                type: 'success',
                                message: result,
                                duration: 1000,
                                onClose:()=>{
                                    this.$router.push('/common/team');
                                }
                            })
                        }).catch((reason)=>{
                            this.$message.error(reason);
                        });
                    else
                        this.$message.error('请选择团队');
                }
            })
        }
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.join-team-body{
    width:30rem;
    margin: 2rem auto;
}
.searched-team-list{
    max-height: 15rem;
    overflow: scroll;
    color:#888888;
}

.searched-team-item{
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
}

.searched-team-item:hover{
    background: @support-color-bg;
    border-radius: 1rem;
    // color: @main-color;
}

.searched-team-name{
    max-width: 12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.join-team-submit{
	outline:none;
    margin-left: 6rem;
    padding: 0.6rem 1rem;
    background-color: @support-color-ps;
    color: white;
    border: solid 0.1rem #dddddd;
    border-radius: 0.3rem;
}

.join-team-submit:hover{
    background-color:@main-color;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.searched-teams-enter-active, .searched-teams-leave-active {
  transition: all .8s;
}
.searched-teams-enter, .searched-teams-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-2rem);
}

</style>