<template id='register'>
    <div class="standard">
        <div>
            <div class="tab">
                <router-link to="/user/forgetPassword">
                    <div class="children">忘记密码</div>
                </router-link>
                <router-link to="/user/loginIn">
                    <div class="children">登录</div>
                </router-link>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register'
}
</script>

<style scoped>
    .children {
        width:200px;
        height: 50px;
        background-color: blue;
    }
</style>