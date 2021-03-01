<template>
    <div>
        <el-col :span="2" class="common-nav"> 
            <div class="logo">LOGO</div> 
            <div class="navigation">  
                <router-link to="/common/main" class="nav-item">
                    <div class="el-icon-s-home"></div>
                    <div>主页</div>
                </router-link>
                <router-link to="/common/team" class="nav-item">
                    <div class="el-icon-user-solid"></div><div class="el-icon-user-solid special"></div>
                    <div>团队协同</div>
                </router-link>
                <router-link to="3" class="nav-item">
                    <div class="el-icon-user-solid"></div>
                    <div>个人空间</div>
                </router-link>
                <router-link to="/common/profile/siteSetting" class="nav-item">
                    <div class="el-icon-s-tools"></div>
                    <div>设置中心</div>
                </router-link>
            </div>
            <el-dropdown @command="handleCommand"  class="avatar" placement="right-end">
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
        <el-col :span="22">
            <router-view></router-view>
        </el-col>
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

.common-nav{
    border-right: #dddddd solid 1px;
    height: calc(100vh);
}

.logo{
    text-align: center;
    height: 4rem;
    border-bottom: 0.2rem solid lightblue;
}
.navigation{
    text-align: center;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
}

.nav-item{
    margin: 1rem 0;
}

.nav-item :first-child{
    font-size: 1.8rem;
}

.nav-item :last-child{
    font-size: 0.5rem;
}

.special{
    position: relative;
    left: -0.5rem;
}

a {
    text-decoration: none;
    color: #888888;
}
 
.router-link-active {
    text-decoration: none;
    color: #1adad0;
}
.avatar{
    position: fixed;
    bottom: 0;
    margin: 0 2%;
    height: calc(20vh);
}

</style>