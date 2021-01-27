<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><router-link to='/common/main'>主页</router-link></el-menu-item>
            <el-submenu index="2">
                <template slot="title">团队协同</template>
                <el-menu-item index="2-1">项目团队</el-menu-item>
                <el-menu-item index="2-2">科研团队</el-menu-item>
                <el-menu-item index="2-3">课题组</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">个人仓库</el-menu-item>
            <el-menu-item index="4"><router-link to='/common/profile'>设置中心</router-link></el-menu-item>
            <div>
                <span>{{getUser}}, 欢迎！</span>
                <el-button @click="exit">退出</el-button>
            </div>
            
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1'
            };
        },
        computed: {
            getUser(){
                return this.$store.state.userInfo.actualName;
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            exit(){
                this.$store.commit('REMOVE_INFO');
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
.router-link-active {     
  text-decoration: none;
}

a {
  text-decoration: none; 
}
</style>