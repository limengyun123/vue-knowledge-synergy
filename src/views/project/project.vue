<template>
    <div>
        <el-menu router :default-active="$route.path" class="project-page-menu" mode="horizontal"> 
            <el-menu-item :index="'/common/team/project/'+this.$route.params.id+'/resources'">项目资源</el-menu-item>
            <el-menu-item :index="'/common/team/project/'+this.$route.params.id+'/tasks'">项目任务</el-menu-item>
            <!-- <el-menu-item :index="'/common/team/project/'+this.$route.params.id+'/dynamic'">成员动态</el-menu-item> -->
            <el-menu-item v-if="this.projectAuth" :index="'/common/team/project/'+this.$route.params.id+'/setting'">项目设置</el-menu-item>
        </el-menu>
    
        <router-view class="project-page-content"/>
    </div>
</template>

<script>
export default {
    name: "Project",
    computed:{
        projectAuth(){return this.$store.state.teamInfo.authority['PROJECT'];}
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.project-page-menu{
    height: 4rem;
    display: flex;
    justify-content: flex-end;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
}

.project-page-menu>.el-menu-item.is-active{
    border-bottom-color: @support-color-ps;
}

.project-page-content{
    height: calc(100vh - 4.6rem);
    overflow: scroll;
    padding: 0 2rem;
}
</style>