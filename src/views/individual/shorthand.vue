<template>
    <div ref='shorthand'>
        <div class='shorthand-body'>
            <div class="shorthand-box-card">
                <!-- <div class="shorthand-box-head">
                    <span>
                        <el-input placeholder="请输入标题..." v-model="inputContent" ref="inputContent" class='input-title'></el-input>
                    </span>
                </div> -->
                <div class="shorthand-box-body">
                    <el-input type="textarea" placeholder="请输入内容..." v-model="textareaContent" ref="textareaContent" class='shorthand-textarea-content'> </el-input>
                </div>
                <div class="shorthand-box-footer">
                    <span class='icon-right el-icon-download' @click="saveShorthand"></span>
                </div>
            </div>
            <div class="shorthand-box-card" v-for="item in myShorthands" :key="item.shorthandId">
                <!-- <div class="shorthand-box-head">
                    <span>{{item.title}}</span>
                </div> -->
                <div class="shorthand-box-body"><div>{{item.content}}</div></div>
                <div class="shorthand-box-footer">
                    <span class='el-icon-time'>{{item.time}}</span>
                    <span class='icon-right el-icon-delete' @click="deleteShorthand(item.shorthandId)"></span>
                    <span class='icon-right el-icon-edit' @click="editShorthand(item.shorthandId)"></span>
                </div>
            </div>
        </div>
        <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.currentPage"
            :page-sizes="[5, 11, 17, 23, 29]"
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
import {getShorthandsApi, saveShorthandApi,deleteShorthandApi} from '../../api/individual';

export default {
    name: "Shorthand",
    data(){
        return {
            // inputContent:'',
            textareaContent:'',
            myShorthands: [],
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 5,
                pagerCount: 7
            },
        }
    },
    mounted(){
        this.getShorthands();
    },
    methods: {
        getShorthands(){
            getShorthandsApi(this.paginationInfo).then((result)=>{
                this.myShorthands = result.data.shorthands||[];
                this.paginationInfo.totalNum = result.data.totalNum;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
            // this.$refs['shorthand'].scrollTo(0,0);
            this.$refs['shorthand'].scrollTo(0,this.$refs['shorthand'].scrollHeight);
        },
        saveShorthand(){
            // let input = this.$refs['inputContent'].value.trim();
            let textarea = this.$refs['textareaContent'].value.trim();
            // if(input.length){
                if(textarea.length){
                    saveShorthandApi({content:this.textareaContent}).then((result)=>{
                        this.$message.success(result.msg);
                        this.textareaContent = "";
                        this.getShorthands();
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    })
                }
                else
                    this.$refs['textareaContent'].focus();
            // } else this.$refs['inputContent'].focus();
        },
        editShorthand:function(e){            
            for(let item of this.myShorthands){
                if(item.shorthandId===e){
                    this.$store.commit('SET_SHORTHAND',item);
                }
            }
            this.$router.push('/common/individual/editShorthand/'+e);
        },
        deleteShorthand:function(e){            
            this.$confirm('您将永久删除该速记, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deleteShorthandApi({shorthandId: e}).then(()=>{
                    this.$message.success( '删除成功!');
                    this.getShorthands();
                }).catch((reason)=>{
                    this.$message.error(reason);
                });  
            }).catch(() => {
                this.$message.info('已取消删除');          
            });
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getShorthands();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getShorthands();
        }
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.shorthand-body{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: 2rem 3rem 0; 
    color: #555555;
}

.shorthand-box-card{
    width: 16rem;
    padding: 1rem;
    margin: 1rem;
    border: solid .1rem #dddddd;
    border-radius: .5rem;
    box-shadow: #dddddd 0 0 .6rem;
}

.shorthand-box-card:hover{
    /* box-shadow: #00CCFF 0 0 0.3rem; */
    box-shadow: #aaaaaa 0 0 0.5rem;
}

.shorthand-textarea-content .el-textarea__inner {
    border: 0;
    width: 100%;
    height: 8rem;
}

.shorthand-box-head{
    width: 100%;
    height: 1.8rem;
    border-bottom: #aaaaaa solid 0.1rem;
    font-weight: 600;
}

.shorthand-box-body{
    height: 8rem;
    margin: 0.4rem auto;
}

.shorthand-box-footer{
    height: 2rem;
}

.icon-right{
    float: right;
    font-size: 1.5rem;
    margin: 0 0.3rem;
}

.el-icon-edit:hover{
    color: @brand-color;
}

.el-icon-delete:hover{
    color: @danger-color;
}


</style>