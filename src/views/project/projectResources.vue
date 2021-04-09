<template>
    <div>
        <div class="resource-operate">
            <el-input placeholder="请输入内容" v-model="searchInput" class="user-input-with-select">
                <el-select v-model="searchMethod" slot="prepend" placeholder="请选择查询方式" class='user-method-select'>
                    <el-option label="类型" :value="1"></el-option>
                    <el-option label="文件名" :value="2"></el-option>
                    <el-option label="最早上传时间" :value="3"></el-option>
                    <el-option label="上传者" :value="4"></el-option>
                    <el-option label="大小" :value="5"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchSpecificUser"></el-button>
            </el-input>
            <i @click="changeToSquare" :class="'el-icon-menu resource-layout-icon '+(!listLayout?'resource-list-layout':'')"></i>
            <i @click="changeToList" :class="'el-icon-s-operation resource-layout-icon '+(listLayout?'resource-list-layout':'')"></i>
            <router-link :to="'/common/project/uploadResource/'+projectId"><span class="el-icon-upload resource-layout-icon"></span></router-link>
        </div>
        <div v-if="resources.length && listLayout">
            <el-table :data="resources" class="resource-table">
                <el-table-column prop="resourceType" label="类型" width="80">
                    <template slot-scope="scope">
                        <el-avatar :src="require('@/assets/img/file_type_1.png')" shape="square" size="large" :index="scope.row.resourceType"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="resourceName" label="名称" width="300"></el-table-column>
                <el-table-column prop="resourceCreateTime" label="上传时间" width="140"></el-table-column>
                <el-table-column prop="userName" label="上传者" width="80"></el-table-column>
                <el-table-column prop="resourceSize" label="大小" width="60"></el-table-column>
                <el-table-column fixed="right" label="预览" width="60">
                    <template slot-scope="scope">
                        <a :index="scope.row.resourceId" target="_blank" href='https://view.officeapps.live.com/op/view.aspx?src=http://mczaiyun.top/ht/123.xlsx'><span class="el-icon-view"></span></a>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="下载" width="60">
                    <template slot-scope="scope">
                        <a :index="scope.row.resourceId" href='http://mczaiyun.top/ht/123.xlsx' download='http://mczaiyun.top/ht/123.xlsx'><span class="el-icon-download"></span></a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-else-if="resources.length" class="resource-square">
            <div v-for="item in resources" :key="item.resourceId" class="resource-square-item">
                <div class="resource-square-pic"></div>
                <div class="resource-square-name">
                    <span>{{item.resourceName}}</span>
                </div>
                <div>
                    <span> 来自 </span><span>{{item.userName}}</span> <span> {{item.resourceSize}}</span>
                </div>
                <div>{{item.resourceCreateTime}}</div>
                <div class="resource-square-operate">
                    <a target="_blank" href='https://view.officeapps.live.com/op/view.aspx?src=http://mczaiyun.top/ht/123.xlsx'><span class="el-icon-view resource-operate-icon"></span></a>
                    <a href='http://mczaiyun.top/ht/123.xlsx' download='http://mczaiyun.top/ht/123.xlsx'><span class="el-icon-download resource-operate-icon"></span></a>
                </div>
            </div>
        </div>
        <div v-else class="project-resource-no-data">
            <NoData />
            <div class="project-resource-no-data-operate">
                <router-link :to="'/common/project/uploadResource/'+projectId">上传资源</router-link>
            </div>
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
</template>

<script>
import {getResourcesApi} from '../../api/project';
import NoData from '../../components/noData';

export default {
    name: "ProjectResources",
    components:{
        'NoData': NoData,
    },
    data(){
        return {
            searchInput:'',
            searchMethod: '',
            listLayout: true,
            projectId: 0,
            paginationInfo:{
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
        this.projectId = this.$route.params.id;
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
        },
        changeToSquare(){
            this.listLayout = false;
        },
        changeToList(){
            this.listLayout = true;
        },
        searchSpecificUser(){}

    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.resource-operate{
    // background-color: @support-color-bg;
    min-width: 40rem;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: #dddddd 0 0 0.4rem;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
}
.user-input-with-select {
    width: 35rem;
    background-color: #fff;
}

.user-method-select{
    width: 9rem;
}

.resource-layout-icon{
    float: right;
    font-size: 1.2rem;
    color: #aaaaaa;
    margin: 0.8rem 0.2rem;
}

.resource-layout-icon:hover{
    color: @support-color-ps;
}
.resource-list-layout{
    border: solid 1px @support-color-ps;
    background-color: @support-color-bg;
}

.resource-table{
    box-shadow: #dddddd 0 0 0.4rem;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
}
.resource-square{
    display: flex;
    flex-wrap: wrap;
    font-size: 0.5rem;
    color: #888888;
}

.resource-square-item{
    width: 8rem;
    height: 8rem;
    text-align: center;
    margin: 1rem;
    // background: chartreuse;
}

.resource-square-pic{
    background-image: url('../../assets/img/file_type_1.png');
    background-size: 4rem 4rem;
    width: 4rem;
    height: 4rem;
    margin: 0.5rem auto;
}

.resource-square-name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
}

.resource-square-operate{
    width: 8rem;
    height: 8rem;
    border-radius: 0.5rem;
    box-shadow: #aaaaaa .3rem .4rem 0.3rem;
    text-align: center;
    background: rgba(48, 48, 48, 0.7);
    position: relative;
    top:-7.5rem;
    display: none;
}

.resource-square-operate .resource-operate-icon{
    font-size: 1.4rem;
    color: #cccccc;
    margin: 3rem .5rem;
}

.resource-square-operate .resource-operate-icon:hover{
    color: white;
}

.resource-square-item:hover .resource-square-operate{
    display: block;
}

/* 无团队时的样式*/
.project-resource-no-data{
    margin-top: 10rem;
    text-align: center;
}

.project-resource-no-data-operate{
    width: 8rem;
    margin: auto;
    padding: 0.6rem 1rem;
    background-color: @support-color-ps;
    color: white;
    border: solid 0.1rem #dddddd;
    border-radius: 0.3rem;
}

.project-resource-no-data-operate a{
    text-decoration: none;
    color: white;
}
.project-resource-no-data-operate a:hover{
    color: @main-color;
}
.project-resource-no-data-operate .router-link-active{
    text-decoration: none;
}
/* 无团队时的样式结束*/

.pagination{
    margin: 2rem 0;
    text-align: center;
}
</style>