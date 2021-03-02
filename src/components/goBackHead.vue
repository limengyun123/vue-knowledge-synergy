<template>
    <el-header class='head'>
        <el-col :span='2'>
            <span class="el-icon-back" @click="getBack"></span>
        </el-col>
        <el-col :span='22'>
        <el-breadcrumb class="bread-crumb" separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
            <el-breadcrumb-item>{{this.parentDir}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.childDir}}</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
    </el-header>
</template>

<script>
export default {
    name: "gGoBackHeader",
    data(){
        return {
            parentDir: "",
            childDir: ""
        }
    },
    mounted(){
        switch(this.$route.fullPath.split('/').pop()){
            case "createTeam":
                this.parentDir = "团队协同";
                this.childDir = "创建团队";
                break;
            case "createProject":
                this.parentDir = "团队协同";
                this.childDir = "创建项目";
                break;
            case "editTeam":
                this.parentDir = "团队协同";
                this.childDir = "编辑团队信息";
                break;
            case "addTeammates":
                this.parentDir = "团队协同";
                this.childDir = "添加队员";
                break;
            default:
                this.parentDir = "个人信息";
                this.childDir = "个人档案";
        }
    },
    methods:{
        getBack(){
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>
.head{
    border-bottom: lightblue solid 0.1rem;
    box-shadow: lightblue 0 0 0.5rem 0 ;
    font-size: 2rem;
    padding: 0.6rem 1rem;

}
.bread-crumb{
    margin-top: 0.8rem;
}
</style>
