<template>
    <div class="common-nav-page">
        <div class="common-nav-left"> 
            <div class="common-nav-logo">
                <img :src="require('@/assets/img/logo.png')"  class="common-nav-logo-pic"/>
            </div> 
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
            </div>
            <el-dropdown @command="handleCommand" class="common-nav-avatar" placement="right-end">
                <span>
                    <el-badge :value="noticeNum" :max="99" class="notice-item">
                        <div class='common_nav_avatar'>{{getUser}}</div>
                    </el-badge>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/notification">
                        通知<el-badge :value="noticeNum" :max="99" class="notice-item"></el-badge>
                    </el-dropdown-item>
                    <el-dropdown-item command="/personal">个人档案</el-dropdown-item>
                    <el-dropdown-item :divided=true command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <router-view class='common-nav-right' />
    </div>
</template>

<script>
import {logoutApi} from '../../api/user';

export default {
    data() {
        return {
            noticeNum: 10
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
                case '/personal':
                    this.$router.push('/page/personalInfo');
                    break;
                case '/notification':
                    this.$router.push('/page/notification');
                    break;
                default:
                    logoutApi().then(()=>{
                        this.$message.success("成功退出");
                        this.$store.commit('REMOVE_INFO');
                        this.$router.push('/');
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    });
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
    border-bottom: white 1px solid;
    margin-bottom: 1rem;
}

.common-nav-logo-pic{
    width: 3.4rem;
    height: 3.4rem;
    margin-top: 0.3rem;
    border-radius: .4rem;
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
    margin-top: 80%;
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

.common_nav_avatar{
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 50%;
    background-color: white;
    // color: @main-color;
}

.common-navigation a {
    text-decoration: none;
}


</style>