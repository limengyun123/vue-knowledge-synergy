<template>
    <div class="individual-body">
        <el-menu router :default-active="$route.path" class="individual-page-menu" mode="horizontal"> 
            <el-menu-item index="/common/individual/toDoList">待办事项</el-menu-item>
            <el-menu-item index="/common/individual/shorthand/">想法速记</el-menu-item>
            <el-menu-item index="/common/individual/taskStats/">任务统计</el-menu-item>
            <el-menu-item index="/common/individual/contributions/">个人贡献</el-menu-item>
        </el-menu>
    
        <router-view class="individual-page-content"/>
    </div>
</template>

<style lang="less">
@import "../../assets/css/common.less";

.individual-page-menu{
    height: 4rem;
    margin-bottom: 0.5rem;
    margin-left: 2rem;
}

.individual-page-menu>.el-menu-item.is-active{
    border-bottom-color: @support-color-ps;
}

.individual-page-content{
    height: calc(100vh - 4.6rem);
    overflow: scroll;
    padding: 0 2rem;
}

</style>