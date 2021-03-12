<template>
    <div>项目任务
        <div class='test1' ref='test1'>
            
        </div>
    </div>
</template>

<script>
export default {
    name: "ProjectTasks",
    created(){
        console.log(this.$route.params.id);
    },
    methods:{
        
    }
}
</script>

<style scoped>

</style>