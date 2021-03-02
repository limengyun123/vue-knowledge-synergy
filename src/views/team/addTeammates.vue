<template>
    <div>
        <GoBackHead />
        <el-col :span='11'>
            <el-card class="box-card card1">
                <div slot="header" class="clearfix">
                    <span>待选用户</span>
                </div>
                <div>
                    <p>1、通过账号搜索</p>
                    <el-input placeholder="请输入用户账号" v-model="inputName">
                        <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                    </el-input>
                    <div v-if="Object.keys(searchedUser).length > 0">
                        <el-checkbox @change="addChosenUser" v-model="checked">{{searchedUser.userName}}   {{searchedUser.actualName}}</el-checkbox>
                    </div>
                </div>
                <div>
                    <p>2、从联系人中添加</p>
                    <div class="contacts-box">
                        <el-checkbox-group v-model="teamMembers" :max="50">
                            <div v-for="member in myContacts" :key="member.userName"><el-checkbox :label="member">{{member.actualName}}</el-checkbox></div>
                        </el-checkbox-group>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span='2'>
            <span class="el-icon-d-arrow-right"></span>
        </el-col>
        <el-col :span='11'>
            <el-card class="box-card card2">
                <div slot="header" class="clearfix">
                    <span>已选择用户</span>
                </div>
                <div class="chosen-mates">
                <el-tag v-for="member in teamMembers" :key="member.userName" closable :disable-transitions="false" @close="handleClose(member.userName)">
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
import {getContactsApi, searchUserApi,addTeammatesApi} from '../../api/team'
import GoBackHead from '../../components/goBackHead'

export default {
    name: "AddTeammates",
    components: {
        'GoBackHead': GoBackHead
    },
    data(){
        return { 
            checked: false,
            inputName: "",
            searchedUser: {},
            teamMembers: [],    
            myContacts:[],
        }
    },
    mounted(){
        getContactsApi(this.$store.state.userInfo.userName).then((result)=>{
            this.myContacts = result.data;
        }).catch((reason)=>{
            this.$message.error(reason);
        })
    },
    methods:{
        searchUser(){
            if(this.inputName){
                searchUserApi(this.inputName).then((result)=>{
                    this.searchedUser=result.data;
                }).catch((reason)=>{
                    this.$message.error(reason);
                })
            }
        },
        addChosenUser(){
            if(this.teamMembers.every((currentValue)=>{
                return currentValue.userName!=this.searchedUser.userName;
            })) this.teamMembers.push(this.searchedUser);
            else this.$message.error("该用户已添加");
            this.searchedUser = {};
            this.inputName = "";
            this.checked = false;
        },
        submitTeammates(){
            addTeammatesApi(this.teamMembers).then((result)=>{
                this.$message.success(result.msg);
                this.teamMembers = [];
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        handleClose(tag) {
            for(let index in this.teamMembers){
                if(this.teamMembers[index].userName==tag){
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
.contacts-box{
    width: 16rem;
    height:13rem;
    margin: auto;
    overflow: scroll;
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