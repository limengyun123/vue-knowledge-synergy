<template>
    <div>
        <div v-if="resources.length">
            <div v-for="item in resources" :key="item.rId" class="project-resources">
                <p><span>{{item.rName}}</span><span>{{item.rUploadTime}}</span><span>{{item.rAuthorName}}</span></p>
            </div>
            <el-pagination class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.currentPage"
            :page-sizes="[3,10, 20, 30, 40]"
            :page-size="paginationInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationInfo.totalNum"
            :pager-count="paginationInfo.paperCount"
            hide-on-single-page
            >
        </el-pagination>
        </div>
        <div v-else>
            暂无资源
        </div>
    </div>
</template>

<script>
import {getResourcesApi} from '../../api/project'

export default {
    name: "ProjectResources",
    data(){
        return {
            paginationInfo:{
                pId:0,
                totalNum: 0,
                currentPage: 1,
                pageSize: 3,
                pagerCount: 7
            },
            resources:[]
        }
    },
    created(){
        // console.log(this.$route.params.id);
        this.paginationInfo.pId = this.$route.params.id;
        this.getResource();
    },
    methods:{
        getResource(){
            // console.log(getResourcesApi(this.paginationInfo));
            getResourcesApi(this.paginationInfo).then((result)=>{
                this.resources = result.data.resources;
                this.paginationInfo.totalNum = result.data.totalNum;
            }).catch((reason=>{
                this.$message.error(reason);
            }));
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getResource();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getResource();
        }
    }
}
</script>

<style scoped>
    .project-resources{
        border-bottom: #bbbbbb 1px solid;
        height: 3rem;
    }
    .pagination{
        margin-top: 3rem;
        text-align: center;
    }
</style>