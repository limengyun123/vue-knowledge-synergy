<template>
    <div>
        <el-collapse v-model="activeNames" @change="handleChange" class="dynamic-body">
            <el-collapse-item title="2021-03" name="1">
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.timestamp">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-collapse-item>
            <el-collapse-item title="2021-02" name="2">
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.timestamp">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-collapse-item>
            <el-collapse-item title="2021-01" name="3">
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.timestamp">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-collapse-item>
            <el-collapse-item title="2020-12" name="4">
                <el-timeline>
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.timestamp">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>

<script>
export default {
    name: "MatesDynamic",
    data(){
        return {
            activeNames: ['1'],
            activities:[
                { content: '活动按期开始', timestamp: '2021-03-15' }, 
                { content: '通过审核', timestamp: '2021-03-13' }, 
                { content: '创建成功', timestamp: '2021-03-11' }
            ]
        }
    },
    methods:{
        handleChange(){}
    }
}
</script>

<style scoped>
    .dynamic-body{
        width: 90%;
        margin: 2rem 5% 0;
    }

</style>