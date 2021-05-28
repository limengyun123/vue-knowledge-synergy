<template>
    <div>
        <GoBackHead />
        <div class="edit-team-body">
            <el-form :model="teamInfo" status-icon ref="teamInfo" :rules="infoRules" label-width="100px">
                <el-form-item label="团队名称" prop="teamName">
                    <el-input v-model="teamInfo.teamName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="组长" prop="teamLeader">
                    <el-input v-model="teamInfo.teamLeader" autocomplete="off" disabled >
                        <el-button v-if="teamInfo.leaderId==userId" slot='append' icon="el-icon-refresh" @click="showDialog = true"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="所属机构" prop="institute">
                    <el-input v-model="teamInfo.institute" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="团队简介" prop="brief">
                    <el-input v-model="teamInfo.brief" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="组员" prop="teamMembers">
                    <div class='edit-team-teammates-show' @click="handleRemove">
                        <transition-group name="teammates-list" >
                        <div v-for="member in teamInfo.teamMembers" :key='member.id' class='edit-team-teammates-item'>
                            <span class="edit-team-teammates-name" :title="member.actualName">{{member.actualName}}</span>
                            <span class="el-icon-remove edit-team-delete-teammates-icon" :index='member.id'></span>
                        </div>
                        </transition-group>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitTeam" class='edit-team-button'>确认修改</el-button>
                    <!-- <el-button type="danger" @click="dismissTeam">解散团队</el-button> -->
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="转让团队" :visible.sync="showDialog" width="30%">
            <el-radio-group v-model="transferTo" class="transfer-team-to">
                <el-radio v-for="item in teamInfo.teamMembers" :key="item.id" :label="item.id" class='transfer-team-radio-item'>{{item.actualName}}</el-radio>
            </el-radio-group>
            <div class="transfer-team-button">
                <el-button type="warning" @click="ensureTransfer">确认转让</el-button>
                <el-button @click="showDialog = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {transferTeamApi, editTeamApi} from '../../api/team'
import GoBackHead from '../../components/goBackHead'

export default {
    name: "EditTeammates",
    components: {
        'GoBackHead': GoBackHead
    },
    data(){
        return {
            showDialog: false,
            transferTo: '',
            teamInfo: {
                teamId: 0,
                teamName: '',
                teamLeader:'',
                leaderId:'',
                brief: '',
                institute:'',
                teamMembers: []
            },
            movedMembers:[],
            infoRules:{
                teamName:[
                    { min: 2, max: 30, message: "请输入2-30个字符", trigger: 'blur' },
                    { required: true, message: "请输入团队名称", trigger: 'blur' }
                ],
                brief:[
                    { min: 2, max: 30, message: "请输入1-100个字符", trigger: 'blur' },
                    { required: true, message: "请输入团队简介", trigger: 'blur' }
                ],
                institute:[
                    { min: 1, max: 30, message: "请输入1-30个字符", trigger: 'blur' },
                    { required: true, message: "请输入团队所属机构", trigger: 'blur' }
                ],
            }
        }
    },
    computed:{
        userId(){
            return this.$store.state.userInfo.id;
        },
    },
    created(){
        // vuex获取数据
        let teamInfo = this.$store.state.teamInfo;
        // console.log(teamInfo);
        this.teamInfo.teamId = teamInfo.teamChosenId;
        this.teamInfo.teamName = teamInfo.teamName;
        this.teamInfo.leaderId = teamInfo.leaderId;
        this.teamInfo.brief = teamInfo.brief;
        this.teamInfo.institute = teamInfo.institute;
        this.teamInfo.teamMembers = teamInfo.teammates;
        this.teamInfo.teamLeader = this.getNameById(teamInfo.leaderId, teamInfo.teammates);
        // this.getActualNameById(result.data.tLeader);
        // 请求项目数据
        // getTeamInfoApi(this.$route.params.id).then((result)=>{
        //     this.teamInfo.teamName = result.data.tName;
        //     this.teamInfo.teamLeader = this.$store.state.userInfo.actualName;
        //     this.teamInfo.teamMembers = result.data.teammates;
        //     this.getActualNameById(result.data.tLeader);
        // }).catch((reason)=>{
        //     this.$message.error(reason);
        // });
                
    },
    methods:{
        getNameById(id, members){
            for(let member of members){
                if(member.id == id) return member.actualName;
            }
            return "";
        },
        getActualNameById(id){
            for(let item of this.teamInfo.teamMembers){
                if(item.id == id) return item.actualName;
            }
            return "";
        },
        handleRemove(e) {
            let id = e.target.getAttribute('index');
            if(id!=null){
                id = parseInt(id);
                if(id == this.teamInfo.leaderId){
                    this.$message.info("您不能移除团队队长");
                    return null;
                }
                this.$confirm(`您将移除组员"${e.target.parentNode.innerText}"，请慎重考虑！`, '提示', {
                    confirmButtonText: '确认移除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.movedMembers.push(id);
                    this.teamInfo.teamMembers.some((value, index)=>{
                        if(value.id==id){
                            this.teamInfo.teamMembers.splice(index,1);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });                
            }
        },
        ensureTransfer(){
            this.showDialog = false;
            if(this.transferTo && this.transferTo!=this.teamInfo.leaderId){
                this.$confirm(`您将移交团队给“${this.getActualNameById(this.transferTo)}”，请慎重考虑！`, '提示', {
                    confirmButtonText: '确认移交',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        transferTeamApi({teamId: this.teamInfo.teamId, userId: this.transferTo}).then(()=>{
                            this.$message.success("成功移交团队");
                            this.$router.push('/common/team');
                        }).catch((reason)=>{
                            this.message.error(reason);
                        });
                    }).catch(() => {
                        this.$message.info('已取消');          
                });
            }else if(this.transferTo) this.message.info("团队未移交");
        },
        submitTeam(){
            this.$refs["teamInfo"].validate((valid)=>{
                if(valid){
                    editTeamApi({
                        teamId: this.teamInfo.teamId,
                        team: {teamName:this.teamInfo.teamName, brief: this.teamInfo.brief, institute:this.teamInfo.institute},
                        removedMembers: this.movedMembers
                    }).then(()=>{
                        this.$message.success("成功修改团队信息");
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    })
                }
            })
        },
        dismissTeam(){
            this.$confirm('您正在操作“解散团队”，请慎重考虑！', '提示', {
                confirmButtonText: '确认解散',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '解散成功!',
                    duration: 1000,
                    onClose:()=>{this.$router.push('/common/team')}
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消解散'
                });          
            });
        }
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.edit-team-body{
    width:30rem;
    margin: 2rem auto;
}

.edit-team-teammates-show{
    max-height:18rem;
    overflow: scroll;
}

.edit-team-teammates-item{
    color: #888888;
}

.edit-team-teammates-name{
    display: inline-block;
    width: 19rem;
    height: 1.2rem;
    line-height: 1.2rem;
    margin-top: 1rem;
    margin-left: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: none;
}

.edit-team-teammates-item:hover{
    background-color: @support-color-bg ;
    border-radius: .3rem;
}

.edit-team-delete-teammates-icon{
    display: inline-block;
    margin-left: 1rem;
}

.edit-team-delete-teammates-icon:hover{
    color: #F56C6C;
}

.teammates-list-enter-active, .teammates-list-leave-active {
    transition: all .8s;
}
.teammates-list-enter, .teammates-list-leave-to{
    opacity: 0;
    transform: translateY(-30px);
}


.edit-team-button{
    margin-left: 6rem;
}


.transfer-team-to{
    margin: 2rem 1rem;
}

.transfer-team-radio-item{
    margin:.5rem;
}

.transfer-team-button{
    text-align: center;
}
</style>