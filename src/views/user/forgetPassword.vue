<template>
    <div class="standard">
        <div>
            <div class="tab">
                <router-link to="/user/loginIn">
                    <div class="children">登录</div>
                </router-link>
                <router-link to="/user/register">
                    <div class="children">注册</div>
                </router-link>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ForgetPassword'
}
</script>

<style scoped>
    .children {
        width:200px;
        height: 50px;
        background-color: green;
    }
</style>