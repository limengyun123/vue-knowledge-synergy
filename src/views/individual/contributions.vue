<template>
    <div>
        <div class='contributions-title'><h3>贡献总览</h3></div>
        <div class='contributions-overview'>
            <p>自加入网站以来，您一共加入了X个团队，参与了XX个项目，在X个团队中担任重要位置</p>
            <p>完成了XXX项任务，上传了XXX份资源</p>
            <p>在XXX团队上传的资源数最多，共XX份，占容量XXXM</p>
            <p>在XXX项目上传的资源数最多，共XX份，占容量XXXM</p>
            <p>在XXX份资源下发表了评论，共XXX条</p>
            <p>在XXX份资源下收到了评论，共XXX条</p>
            <p>其中与 XXX 好友交流得最为频繁</p>
        </div>
        <div class='contributions-title'><h3>贡献详情</h3></div>
        <div class="contributions-detail">
            <!-- <div>成员动态类型：创建项目、上传资源、删除资源、发布任务、取消任务、完成任务、修改项目</div> -->
            <div class='contributions-detail-choose'>
                <span>时间选择：</span>
                <el-select v-model="contributionsTimeRange" slot="prepend" @change="selectContributionsTime">
                    <el-option label="近一周" :value="1"></el-option>
                    <el-option label="近一月" :value="2"></el-option>
                    <el-option label="近一年" :value="3"></el-option>
                    <el-option label="所有" :value="4"></el-option>
                </el-select>
            </div>
            <el-timeline>
                <el-timeline-item
                    v-for="(activity, index) in contributions"
                    :key="index"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                </el-timeline-item>
            </el-timeline>
        </div>
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="paginationInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationInfo.totalNum"
            :pager-count="paginationInfo.paperCount"
            hide-on-single-page
        >
        </el-pagination>   
    </div>
</template>

<script>
import {getDynamicsApi} from '../../api/project';

export default {
    name: 'Contributions',
    data(){
        return {
            contributionsTimeRange: 1,
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 10,
                pagerCount: 7
            },
            contributions:[]
        }
    },
    created(){
        this.getContributions();
    },
    methods:{
        getContributions(){
            getDynamicsApi(this.paginationInfo).then((result)=>{
                this.contributions = result.data.dynamics;
                this.paginationInfo.totalNum = result.data.totalNum;
            }).catch((reason=>{
                this.$message.error(reason);
            }));
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getContributions();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getContributions();
        },
        selectContributionsTime(){}
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";
.contributions-title{
    border-left: @main-color solid .5rem;
    background-color: @support-color-bg ;
    margin: 1rem;
    padding: .1rem 1rem;
}

.contributions-overview{
    margin: 1rem 3rem 4rem;
}

.contributions-detail{
    margin: 1rem;
}

.contributions-detail-choose{
    margin: 1rem 1rem 2rem;
}
</style>