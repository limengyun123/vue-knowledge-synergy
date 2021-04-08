<template>
    <div class="common-nav-page">
        <div class="common-nav-left"> 
            <div class="common-nav-logo">LOGO</div> 
            <div class="common-navigation">  
                <router-link to="/common/main" class="common-nav-item">
                    <div class="el-icon-s-home"></div>
                    <div>主页</div>
                </router-link>
                <router-link to="/common/team" class="common-nav-item">
                    <div class="el-icon-user-solid"></div><div class="el-icon-user-solid icon-user-special"></div>
                    <div>团队协同</div>
                </router-link>
                <router-link to="/common/individual" class="common-nav-item">
                    <div class="el-icon-user-solid"></div>
                    <div>个人空间</div>
                </router-link>
                <router-link to="/common/message" class="common-nav-item">
                    <div class="el-icon-chat-dot-round"></div>
                    <div>消息</div>
                </router-link>
                <router-link to="/common/profile/siteSetting" class="common-nav-item">
                    <div class="el-icon-s-tools"></div>
                    <div>设置中心</div>
                </router-link>
            </div>
            <el-dropdown @command="handleCommand" class="common-nav-avatar" placement="right-end">
                <span>
                    <el-avatar :src="require('@/assets/img/avatar_1.png')"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personal">个人档案</el-dropdown-item>
                    <el-dropdown-item command="English">English</el-dropdown-item>
                    <el-dropdown-item :divided=true command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class='common-nav-right'>
            <router-view></router-view>
        </div>
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

<style lang="less">
@import "../../assets/css/common.less";

.common-nav-page{
    display: flex;
}

.common-nav-left{
    width: 5rem;
    height: calc(100vh);
    text-align: center;
    background-color: @main-color;
    background-image: linear-gradient(@main-color, @support-color-ps);
}

.common-nav-right{
    flex:1;
}

.common-nav-logo{
    height: 4rem;
	text-align: center;
	color: white;
	line-height: 4rem;
    border-bottom: white 0.1rem solid;
    margin-bottom: 1rem;
}

/* 修改导航栏样式*/
.common-navigation{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.common-nav-item{
    width: 4rem;
    height: 3.3rem;
    color: white;
    margin: 0.2rem;
    padding-top: 0.7rem;
}

.common-nav-avatar{
    margin-top: 40%;
}

.common-nav-item :first-child{
    font-size: 1.8rem;
}

.common-nav-item :last-child{
    font-size: 0.4rem;
}

.common-navigation>.router-link-active{
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    color: white;
}

// .common-navigation>.router-link-active::after{
//     content: "◀";
//     position: relative;
//     top: -1.9rem;
//     left: 2.3rem;
// }
/* 修改导航栏样式结束 */

.icon-user-special{
    position: relative;
    left: -0.5rem;
}

.common-navigation a {
    text-decoration: none;
}


</style>