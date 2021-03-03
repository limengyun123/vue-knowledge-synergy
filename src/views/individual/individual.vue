<template>
    <div class="individual-body">
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" mode="horizontal"> 
            <el-menu-item index="/common/individual/toDoList">待办事项</el-menu-item>
            <el-menu-item :index="'/common/team/project/'+this.$route.params.id+'/tasks'">想法速记</el-menu-item>
            <el-menu-item :index="'add'">任务统计</el-menu-item>
            <el-menu-item :index="'mi'">个人贡献</el-menu-item>
            <el-menu-item :index="'mi'">消息提醒</el-menu-item>
        </el-menu>
    
        <router-view />
    </div>
</template>

<style scoped>
.individual-body{
    margin-left:3rem;
}
.el-menu-vertical-demo{
    padding-left: 3rem;
    margin-bottom: 2rem;
}
</style>