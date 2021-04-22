<template>
    <div class="user-page">
        <div class="user-form-bg">
            <div class="user-main-content">
                <div class='user-page-avatar'><span class="el-icon-user"></span></div>
                <router-view />
            </div>
        </div>
    </div>
</template>

<style lang='less'>
@import "../../assets/css/common.less";


.user-page{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(0deg, white, @support-color-ps); 
}

.user-form-bg{
    width: 30%;
    min-width: 20rem;
    margin: 2rem 35%;
    position: absolute;
    border: solid #eeeeee 1px;
    border-radius: 3%;
    overflow: hidden;  
}

.user-form-bg:before{
    content: '';
    width: 140%;
    height: 200rem;
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    left: -20%; 
    top: -2rem; 
    -webkit-filter:blur(2rem);
    filter: blur(2rem);
}

.user-main-content{
    padding: 2rem 2rem 0;
    z-index: 1;
}

.user-page-avatar{
    margin: auto;
    width: 4rem;
    height: 4rem;
    border: #eeeeee solid 1px;
    border-radius: 50%;
    background-color:@main-color;
    color:white;
    font-size: 2.5rem;
    text-align: center;
}
</style>