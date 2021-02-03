<template>
    <div>
        <el-row>
            <el-col :span="7" class="title">知识协同管理</el-col>
            <el-col :span="14">  
                <el-menu router :default-active="$route.path" class="navigation" mode="horizontal">  
                    <el-menu-item index="/common/main">主页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">团队协同</template>
                        <el-menu-item index="2-1">项目团队</el-menu-item>
                        <el-menu-item index="2-2">科研团队</el-menu-item>
                        <el-menu-item index="2-3">课题组</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">个人仓库</el-menu-item>
                    <el-menu-item index="/common/profile">设置中心</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-dropdown @command="handleCommand"  class="avatar">
                    <span>
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personal">个人档案</el-dropdown-item>
                        <el-dropdown-item command="English">English</el-dropdown-item>
                        <el-dropdown-item :divided=true command="exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>    
        
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        },
        computed: {
            getUser(){
                return this.$store.state.userInfo.actualName;
            }
        },
        methods: {
            handleCommand(command) {
                switch(command){
                    case 'personal':
                        this.$router.push('/personalInfo');
                        break;
                    case 'English':
                        break;
                    default:
                        this.$store.commit('REMOVE_INFO');
                        this.$router.push('/');
                }
            },
            
        }
    }
</script>

<style scoped>

.title{
    float:left;
    font-size: 2rem;
    padding: 0.5rem;
}

.navigation{
    float: right;
}

.avatar{
    margin-top: 0.5rem;
}

</style>