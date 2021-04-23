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
                        <el-button slot='append' icon="el-icon-refresh" @click="showDialog = true"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="组员" prop="teamMembers">
                    <div class='edit-team-teammates-show' @click="handleRemove">
                        <transition-group name="teammates-list" >
                        <div v-for="member in teamInfo.teamMembers" :key='member.userName' class='edit-team-teammates-item'>
                            <span class="edit-team-teammates-name" :title="member.actualName">{{member.actualName}}</span>
                            <span class="el-icon-remove edit-team-delete-teammates-icon" :index='member.userName'></span>
                        </div>
                        </transition-group>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitTeam" class='edit-team-button'>确认修改</el-button>
                    <el-button type="danger" @click="dismissTeam">解散团队</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="转让团队" :visible.sync="showDialog" width="30%">
            <!-- <el-checkbox-group v-model="teamInfo.teamMembers" :max="50">
                <div v-for="member in myContacts" :key="member.userName"><el-checkbox :label="member.userName">{{member.actualName}}</el-checkbox></div>
            </el-checkbox-group> -->
            <el-radio-group v-model="transferTo" class="transfer-team-to">
                <el-radio v-for="item in this.teamInfo.teamMembers" :key="item.userName" :label="item.userName" class='transfer-team-radio-item'>{{item.actualName}}</el-radio>
            </el-radio-group>
            <div class="transfer-team-button">
                <el-button type="warning" @click="ensureTransfer">确认转让</el-button>
                <el-button @click="showDialog = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {createTeamApi, getTeamInfoApi} from '../../api/team'
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
                teamName: "",
                teamLeader:'',
                teamMembers: []
            },
            infoRules:{
                teamName:[
                    {
                        min: 2,
                        max: 30,
                        message: "请输入2-30个字符",
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: "请输入团队名称",
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    created(){
        // console.log(this.$route.params.id);
        // 请求项目数据
        getTeamInfoApi(this.$route.params.id).then((result)=>{
            this.teamInfo.teamName = result.data.tName;
            this.teamInfo.teamMembers = result.data.teammates;
            this.getActualNameById(result.data.tLeader);
        }).catch((reason)=>{
            this.$message.error(reason);
        });
                
    },
    methods:{
        getActualNameById(id){
            this.transferTo = id;
            for(let item of this.teamInfo.teamMembers){
                if(item.userName == id){
                    this.teamInfo.teamLeader = item.actualName;
                    return true;
                }
            }
            return false;
        },
        handleRemove(e) {
            let id = e.target.getAttribute('index');
            if(id){
                this.$confirm('您将移除组员，请慎重考虑！', '提示', {
                    confirmButtonText: '确认移除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '移除成功!',
                        duration: 1000,
                    });
                    this.teamInfo.teamMembers.some((value, index)=>{
                        if(value.userName==id){
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
            if(this.transferTo){
                this.getActualNameById(this.transferTo);
            }
        },
        submitTeam(){
            this.$refs["teamInfo"].validate((valid)=>{
                if(valid){
                    if(this.getActualNameById(this.transferTo)){
                        createTeamApi(this.teamInfo).then((result)=>{
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                duration: 1000,
                                onClose:()=>{this.$router.push('/common/team')}
                            });
                        }).catch((reason)=>{
                            this.$message.error(reason);
                        });
                    }else{
                        this.$alert('您将会把团队新的组长从团队中移除，请谨慎操作', '标题名称', {
                            confirmButtonText: '已读',
                            type: 'warning',
                        });
                    }
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
    margin-left: 4rem;
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