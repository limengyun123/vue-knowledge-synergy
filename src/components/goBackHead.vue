<template>
    <el-header class='head'><span class="el-icon-back" @click="getBack"></span></el-header>
</template>

<script>
export default {
    name: "gGoBackHeader",
    methods:{
        getBack(){
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>
.head{
    background-color: blue;
    font-size: 2rem;
    color:white;
    padding: 0.4rem 1rem;
}
</style>
