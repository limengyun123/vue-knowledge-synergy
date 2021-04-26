<template>
    <el-header class='common-head'>
        <span class="el-icon-back" @click="getBack"></span>
        <span>
            <span>{{this.parentDir}}</span>
            <span> / </span>
            <span>{{this.childDir}}</span>
        </span>
    </el-header>
</template>

<script>
export default {
    name: "GoBackHeader",
    data(){
        return {
            parentDir: "",
            childDir: ""
        }
    },
    mounted(){
        let path = this.$route.fullPath.split('/');
        switch(path.pop()){
            case "createTeam":
                this.parentDir = "团队协同";
                this.childDir = "创建团队";
                break;
            case "joinTeam":
                this.parentDir = "团队协同";
                this.childDir = "加入团队";
                break;
            case "editTeammates":
                this.parentDir = "团队协同";
                this.childDir = "编辑团员信息";
                break;
            case "addTodo":
                this.parentDir = "个人空间";
                this.childDir = "新建待办事项";
                break;
            case 'personalInfo':
                this.parentDir = "个人信息";
                this.childDir = "个人档案";
            case 'notification':
                this.parentDir = "个人信息";
                this.childDir = "通知";
            default:
                switch(path.pop()){
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
                        this.childDir = "添加成员";
                        break;
                    case "editShorthand":
                        this.parentDir = "个人空间";
                        this.childDir = "编辑速记";
                        break;
                    case "assignTask":
                        this.parentDir = "项目管理";
                        this.childDir = "分配任务";
                        break;
                    case "uploadResource":
                        this.parentDir = "项目管理";
                        this.childDir = "上传资源";
                        break;
                    case "resourceDetail":
                        this.parentDir = "项目管理";
                        this.childDir = "资源详情";
                        break;
                }
        }
    },
    methods:{
        getBack(){
            this.$router.back(-1);
        }
    }
}
</script>

<style lang="less">
@import "../assets/css/common.less";

.common-head{
    height: 4rem;
    background-color: @support-color-ps;
    background-image: linear-gradient(to right,@main-color, @support-color-ps);
    color:white;
    line-height: 4rem;
}

.common-head .el-icon-back{
    font-size: 2rem;
    margin-right: 3rem;
}
</style>
