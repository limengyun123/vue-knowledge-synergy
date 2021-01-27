<template>
  	<div>
		<div class='static-info'>
			<span class='title'>知识协同平台</span>
			<router-link to="/user/register"><span class="operate-button">注册</span></router-link>
			<router-link to="/user/loginIn"><span class="operate-button">登录</span></router-link>
		</div>
		<div>
            <div class="fixed-bg bg1">
            </div>
            <div class="fixed-bg bg2">
            </div>
            <div class="fixed-bg bg3">
            </div>
            <div class="fixed-bg bg4">
            </div>
            <div class="fixed-bg bg5">
            </div>

        </div>
	</div>
</template>

<script>

export default {
	name: 'Home',
	}
</script>

<style scoped>
	.static-info{
		position: fixed;
		width: 100%;
		/* height: 3rem; */
		border-bottom: white solid 0.2rem;
	}
	.title{
		font-size: 3rem;
		color: white;
		margin: 1rem 2.5rem;
		text-shadow: #dddddd 0.2rem 0.2rem 0.2rem;
	}
	.operate-button{
		margin-right: 2rem;
		margin-top: 1rem;
		float: right;
		color: white
	}

.fixed-bg {
    position: relative;
    height: 50rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
	width:100%;
    z-index: -1;
    background-attachment: fixed; 
}


.bg1 {
    background-image: url('http://pic1.win4000.com/wallpaper/f/555594cfb0e50.jpg');
}

.bg2{
    background-image: url('http://pic1.win4000.com/wallpaper/f/555594d20d8df.jpg');
}

.bg3{
    background-image: url('http://pic1.win4000.com/wallpaper/f/555594d72e8ba.jpg');
}

.bg4{
    background-image: url('http://pic1.win4000.com/wallpaper/f/555594ce1b3ce.jpg');
}

.bg5 {
    background-image: url('http://pic1.win4000.com/wallpaper/f/555594da3a03f.jpg');
}


</style>
