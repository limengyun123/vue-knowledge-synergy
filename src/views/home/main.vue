<template>
    <div>
        <el-row>
            <el-col :span='18'>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>进度简明</span>
                    </div>
                    <div class='brief-process'>
                        <div class='brief-process-item' title="三天内需完成的任务">紧急任务<div class='task urgent-task'>2</div></div>
                        <div class='brief-process-item'>我的任务<div class='task my-task'>12</div></div>
                        <div class='brief-process-item'>进行中的项目<div class='task project-ing'>3</div></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>最新动态</span>
                    </div>
                    <el-timeline>
                        <el-timeline-item
                            v-for="(activity, index) in activities"
                            :key="index"
                            :timestamp="activity.timestamp">
                            {{activity.content}}
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data() {
      return {
            reverse: true,
            activities: [{
            content: '活动按期开始',
            timestamp: '2018-04-15'
            }, {
            content: '通过审核',
            timestamp: '2018-04-13'
            }, {
            content: '创建成功',
            timestamp: '2018-04-11'
            }]
      };
    }
}
</script>

<style scoped>

.box-card{
    margin: 2rem;
}
.brief-process{
    display: flex;
}

.brief-process-item{
    flex: 1;
    text-align: center;
    font-size: 1.2rem;
}

.task{
    font-size: 3rem;
    
}

.urgent-task{
    color:red;
}

.my-task{
    color:lightblue;
}

.project-ing{
    color: lightgreen;
}
</style>