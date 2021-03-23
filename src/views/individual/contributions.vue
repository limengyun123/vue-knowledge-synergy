<template>
    <div>
        <div>
            <p>自加入网站以来，您一共加入了X个团队，参与了XX个项目，在X个团队中担任重要位置</p>
            <p>完成了XXX项任务，上传了XXX份资源</p>
            <p>在XXX团队上传的资源数最多，共XX份，占容量XXXM</p>
            <p>在XXX项目上传的资源数最多，共XX份，占容量XXXM</p>
            <p>在XXX份资源下发表了评论，共XXX条</p>
            <p>在XXX份资源下收到了评论，共XXX条</p>
            <p>其中与 XXX 好友交流得最为频繁</p>
        </div>
        <div>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="在暨南软件影票售卖系统中上传资源58份" name="1">
                    <div>在cinema_tickets_version_0.8项目中上传资源23份，评论0次</div>
                    <div>在cinema_tickets_version_1.0项目中上传资源35份，评论3次</div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="效率 Efficiency" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contributions',
    data(){
        return {
            activeNames: 1,
        }
    },
    methods:{
        handleChange(val) {
            // console.log(val);
        }
    }
}
</script>