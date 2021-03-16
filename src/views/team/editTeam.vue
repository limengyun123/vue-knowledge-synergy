<template>
    <div>
        <GoBackHead />
        <div class="create-team-body">
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
                    <div class='teammates-box' @click='handleDeleteClick'>
                        <div v-for="member in teamInfo.teamMembers" :key="member.userName">{{member.actualName}}
                            <span class="el-icon-remove" :index='member.userName'></span>
                        </div>
                    </div>  
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitTeam">确认修改</el-button>
                    <el-button type="danger" @click="dismissTeam">解散团队</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog title="转让团队" :visible.sync="showDialog" width="30%">
            <!-- <el-checkbox-group v-model="teamInfo.teamMembers" :max="50">
                <div v-for="member in myContacts" :key="member.userName"><el-checkbox :label="member.userName">{{member.actualName}}</el-checkbox></div>
            </el-checkbox-group> -->
            <el-radio-group v-model="transferTo">
                <el-radio v-for="item in this.teamInfo.teamMembers" :key="item.userName" :label="item.userName">{{item.actualName}}</el-radio>
            </el-radio-group>
            <el-button type="warning" @click="ensureTransfer">确认转让</el-button>
            <el-button @click="showDialog = false">取消</el-button>
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
        handleDeleteClick(command) {
            // console.log(command.target.getAttribute('index'));
            this.teamInfo.teamMembers.some((value, index)=>{
                if(value.userName==command.target.getAttribute('index')){
                    this.teamInfo.teamMembers.splice(index,1);
                }
                    
            })
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
                    // TODO...
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

<style scoped>

.create-team-body{
    width:30rem;
    margin: 2rem auto;
}
</style>