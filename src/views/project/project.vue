<template>
    <div class="project-body">
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" mode="horizontal"> 
            <el-menu-item :index="'/common/team/project/'+this.$route.params.id+'/resources'">项目资源</el-menu-item>
            <el-menu-item :index="'/common/team/project/'+this.$route.params.id+'/tasks'">项目任务</el-menu-item>
            <el-menu-item :index="'add'">成员动态</el-menu-item>
            <el-menu-item :index="'mi'">项目图谱</el-menu-item>
            <el-menu-item :index="'mi'">项目设置</el-menu-item>
        </el-menu>
    
        <router-view class="project-fixed-body"/>
    </div>
</template>

<script>
export default {
    name: "Project",
}
</script>

<style scoped>
.project-body{
    margin-left:3rem;
}
.el-menu-vertical-demo{
    /* padding-left: 3rem; */
    /* margin-bottom: 2rem; */
    height: 4rem;
}

.project-fixed-body{
    height: calc(99vh - 4rem);
    overflow: scroll;
}
</style>