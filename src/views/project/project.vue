<template>
    <el-row>
         <el-col :span="4">
            <el-menu router :default-active="$route.path" class="el-menu-vertical-demo"> 
                <el-menu-item :index="'/project/'+this.$route.params.id+'/resources'">项目资源</el-menu-item>
                <el-menu-item :index="'/project/'+this.$route.params.id+'/tasks'">项目任务</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="20">
            <router-view />
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "Project",
}
</script>