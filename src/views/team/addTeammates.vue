<template>
    <div>
        <GoBackHead />
        <el-col :span='11'>
            <el-card class="box-card card1">
                <div slot="header" class="clearfix">
                    <span>待选用户</span>
                </div>
                <div>
                    <el-input placeholder="请输入用户邮箱" v-model="inputEmail">
                        <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                    </el-input>
                    <el-checkbox-group v-model="checkedUsers" @change="addChosenUser">
                        <el-checkbox v-for="user in searchedUsers" :label="user.id" :key="user.id">{{user.userName}}   {{user.actualName}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                
            </el-card>
        </el-col>
        <el-col :span='2'>
            <span class="el-icon-d-arrow-right"></span>
        </el-col>
        <el-col :span='11'>
            <el-card class="box-card card2">
                <div slot="header" class="clearfix">
                    <span>已选择成员</span>
                </div>
                <div class="chosen-mates">
                <el-tag v-for="member in teamMembers" :key="member.id" closable :disable-transitions="false" @close="handleClose(member.id)">
                    {{member.actualName}}
                </el-tag>
                </div>
                <div class='ensure-add-button'>
                    <el-button type="primary" @click="submitTeammates">添加成员</el-button>
                </div>
            </el-card>
        </el-col>
    </div>
</template>

<script>
import {searchUserApi,addTeammatesApi} from '../../api/team';
import GoBackHead from '../../components/goBackHead';

export default {
    name: "AddTeammates",
    components: {
        'GoBackHead': GoBackHead
    },
    data(){
        return { 
            inputEmail: "",
            searchedUsers: [],
            checkedUsers: [],
            teamMembers: [],    
        }
    },
    computed:{
        teamId: function (){
            return this.$store.state.teamInfo.teamChosenId;
        }
    },
    methods:{
        searchUser(){
            if(this.inputEmail){
                searchUserApi({teamId: this.teamId, email:this.inputEmail}).then((result)=>{
                    if(result.data.length==0) this.$message.info("未搜索到用户");
                    else this.searchedUsers = result.data;
                }).catch((reason)=>{
                    this.$message.error(reason);
                })
            }
        },
        addChosenUser(value){
            let index = value[0];
            if(this.teamMembers.every((currentValue)=>{
                return currentValue.id!=index;
            })) this.teamMembers.push({id:index, actualName:this.getNameById(index)});
            else this.$message.error("该用户已添加");
            this.searchedUsers = [];
            this.checkedUsers = [];
            this.inputEmail = "";
            
        },
        getNameById(id){
            for(let user of this.searchedUsers){
                if(user.id==id) return user.actualName;
            }
            return "";
        },
        submitTeammates(){
            if(this.teamMembers.length>0){
                addTeammatesApi({teamId:this.teamId, users:this.teamMembers.map((item)=>{return item.id})}).then(()=>{
                    this.$message.success("邀请已发送");
                    this.teamMembers = [];
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
            }
            else
                this.$message.error("未选择成员");
            
        },
        handleClose(tag) {
            for(let index in this.teamMembers){
                if(this.teamMembers[index].id==tag){
                    this.teamMembers.splice(index,1);
                    break;
                }
            }
        },

    }
}
</script>

<style scoped>

.box-card{
    height: 28rem;
    width: 25rem;
    margin: 2rem auto 0;
}

.card1{
    float: right;
}

.card2{
    float: left;
}

.el-icon-d-arrow-right{
    font-size: 4rem;
    color: #dddddd;
    margin: 12rem 1.5rem 0;
}

.chosen-mates{
    width: 16rem;
    height: 18rem;
    margin: auto;
    overflow: scroll;
}

.ensure-add-button{
    width: 100%;
    text-align: center;
    border-top: solid #dddddd 1px;
    margin-top: 1rem;
    padding-top: 0.5rem;
}
</style>