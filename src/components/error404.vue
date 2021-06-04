<template>
    <div class='error-page'>
        <div class='error-code'>404</div>
        <div class="error-description">抱歉，页面不存在</div>
    </div>
</template>

<script>
export default {
    name: 'Error404'
}
</script>

<style lang="less">
@import "../assets/css/common.less";

.error-page{
    width: 100%;
	height: calc(100vh);
	background-color: @support-color-bg;
    background-image: linear-gradient(@support-color-bg, white);
}

.error-code{
    font-size: 10rem;
    width: 20rem;
    text-align: center;
    margin: auto;
    padding-top: 5rem;
    color: @main-color;
}

.error-description{
    font-size: 1.5rem;
    width: 20rem;
    text-align: center;
    margin: auto;
    padding-top: 5rem;
    color: #888888;
}
</style>