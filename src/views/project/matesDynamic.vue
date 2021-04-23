<template>
    <div>
        <div class="mates-dynamic-body">
            <!-- <div>成员动态类型：创建项目、上传资源、删除资源、发布任务、取消任务、完成任务、修改项目</div> -->
            <el-timeline>
                <el-timeline-item
                    v-for="(activity, index) in dynamics"
                    :key="index"
                    :timestamp="activity.timestamp">
                    <el-card>
                        <p>{{activity.content}}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.currentPage"
            :page-sizes="[3, 10, 20, 30, 40]"
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
    name: "MatesDynamic",
    data(){
        return {
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 3,
                pagerCount: 7
            },
            dynamics:[]
        }
    },
    created(){
        // console.log(this.$route.params.id);
        // this.projectId = this.$route.params.id;
        this.getMatesDynamics();
    },
    methods:{
        getMatesDynamics(){
            getDynamicsApi(this.paginationInfo).then((result)=>{
                this.dynamics = result.data.dynamics;
                this.paginationInfo.totalNum = result.data.totalNum;
            }).catch((reason=>{
                this.$message.error(reason);
            }));
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getMatesDynamics();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getMatesDynamics();
        },
    }
}
</script>

<style lang='less'>
@import "../../assets/css/common.less";

.mates-dynamic-body{
    width: 90%;
    margin: 2rem 5% 0;
}

</style>