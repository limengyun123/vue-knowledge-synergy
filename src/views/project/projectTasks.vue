<template>
    <div>项目任务</div>
</template>

<script>
export default {
    name: "ProjectTasks",
    mounted(){
        console.log(this.$route.params.id);
    },
}
</script>