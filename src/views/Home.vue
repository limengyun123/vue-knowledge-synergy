<template>
  	<div>
		<div class='system-introduction-head'>
			<img :src="require('../assets/img/logo.png')"  class="sys-intro-logo" alt="LOGO"/>
			<span class='sys-intro-title'>知识协同管理平台</span>
			<router-link to="/user/register"><span class="operate-button">注册</span></router-link>
			<router-link to="/user/login"><span class="operate-button">登录</span></router-link>
		</div>
		<div class="system-introduction-body">
            <div class="sys-intro-bg">
				<div>
					<p class="sys-intro-img-title">关系图呈现</p>
					<p class="sys-intro-img-content">关系图谱，让已加入的团队、参与的项目一目了然</p>
				</div>
				<div>
					<img :src="require('@/assets/img/bg/page_compo.png')" />
				</div>
            </div>
            <div class="sys-intro-bg">
				<div>
					<img class='sys-intro-img' :src="require('@/assets/img/bg/page_team.png')" />
				</div>
				<div>
					<span class="sys-intro-img-title">项目管理</span>
					<p class="sys-intro-img-content">有关项目的文档、成员任务和成员动态，都应得到妥善管理</p>
				</div>
            </div>
			<div class="sys-intro-bg">
				<div>
					<span class="sys-intro-img-title">成员沟通</span>
					<p class="sys-intro-img-content">沟通让团队协同更加方便快捷</p>
				</div>
				<div>
					<img class='sys-intro-img' :src="require('@/assets/img/bg/page_chat.png')" />
				</div>
            </div>
            <div class="sys-intro-bg">
				<div>
					<img class='sys-intro-img' :src="require('@/assets/img/bg/page_indiv.png')" />
				</div>
				<div>
					<span class="sys-intro-img-title">数据分析</span>
					<p class="sys-intro-img-content">总结回顾与“知识协同管理平台”的相遇、相知</p>
				</div>
            </div>
        </div>
		
		<div class="system-introduction-footer">
			<p>知识协同管理平台</p>
			<div class="footer-description-detail">
				<p>前端开发者：李梦云</p>
				<p>团队成员：李梦云、詹宁子、刘乾坤（排名不分先后）</p>
				<p>无备案 练习使用</p>
			</div>
		</div>	
			
	</div>
</template>

<script>

export default {
	name: 'Home',
	}
</script>

<style lang="less">
@import "../assets/css/common.less";

.system-introduction-head{
	position: fixed;
	width: 100%;
	height: 4rem;
	border-bottom: white solid 0.2rem;
	box-shadow: #cccccc 0 0 1rem;
	background-color: white;
}

.system-introduction-head a{
	color: @support-color-ps;
}

.system-introduction-head a:hover{
	color: @main-color;
}

.sys-intro-logo{
	float: left;
	width: 4rem;
	height: 4rem;
	margin-left: 4rem;
}

.sys-intro-title{
	float: left;
	font-size: 1.5rem;
	line-height: 4rem;
	margin-left: 1rem;
	// color: @main-color;
}
.operate-button{
	margin-right: 2rem;
	line-height: 4rem;
	float: right;
}

.sys-intro-bg {
    width: 100%;
	min-height: calc(100vh);
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	background-color: @support-color-bg;
    background-image: linear-gradient(@support-color-bg, white);
	padding-top: 10rem;
}

.sys-intro-img-title{
	font-size: 2rem;
	font-weight: 700;
	color: #555555;
}

.sys-intro-img-content{
	width: 16rem;
	font-size: 1.2rem;
	line-height: 1.8rem;
}

.sys-intro-img{
	margin-left: 5rem;
	width: 680px;
	border-radius: .5rem;
	box-shadow: #aaaaaa 0 0 1rem;
}

.system-introduction-footer{
	background-color: @main-color ;
	text-align: center;
	color: white;
	padding: 1rem 0;
}

.footer-description-detail{
	font-size: 0.8rem;
}



</style>
  