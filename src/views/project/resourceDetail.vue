<template>
    <div>
        <GoBackHead />
        <div class="resource-detail-body">
            <div class='resource-detail-title'><h3>资源介绍</h3></div>
            <div class="resource-detail-description">
                <!-- 资源简略信息 -->
                <div class="resource-detail-description-pic">
                    <div class='resource-cover-page'></div>
                </div>
                <div class="resource-detail-description-text">
                    <div><b>名    称： </b>{{resourceInfo.resourceName}}</div>
                    <div><b>上 传 者： </b>{{resourceInfo.userName}}</div>
                    <div><b>上传时间： </b>{{resourceInfo.resourceCreateTime}}</div>
                    <div><b>资源大小： </b>{{resourceInfo.resourceSize}}</div>
                    <div><b>评 论 数： </b>{{getResourceRepliesCount}}</div>
                </div>
                <div class='resource-detail-description-delete'>
                    <el-button type="primary" @click="deleteResource">删 除</el-button></div>
            </div>
            <div class='resource-detail-title'><h3>资源预览</h3></div>
            <div class="resource-detail-show">
                <div class="resource-detail-overview">
                    <iframe class='resource-detail-overview-frame' src="https://view.officeapps.live.com/op/view.aspx?src=newteach.pbworks.com%2Ff%2Fele%2Bnewsletter.docx">
                        <p>您的浏览器不支持在线预览，请下载后查看。</p>
                    </iframe>
                    <!-- <div class="resource-detail-overview-frame">
                        <img src="~@/assets/img/big_img.jpg" alt="Paris" />
                    </div> -->
                    
                </div>
                <div class="resource-detail-comments">
                    <!-- 评论 -->
                    <div class='comments-input'>
                        <span slot="prepend" class="el-icon-edit comments-input-pre-icon"></span>
                        <input placeholder="我也说两句" class='comments-input-content' v-model="commentInput">
                        <button slot="append" class="comments-send-button" @click="sendComment">发送</button>
                    </div>
                    <div class='comments-body' @click="handleOperate">
                        <div v-for="cmt in comments" :key="cmt.commentId" class='comments-item'>
                            <div>
                                <el-avatar class="comment-avatar">{{cmt.userName}}</el-avatar>
                                <span v-if="getUserId==cmt.id" class='el-icon-delete comment-operate' :index="'d'+cmt.commentId"></span>
                                <span class='comment-operate'>{{cmt.commentTime}}</span>
                            </div>
                            <div class="comments-item-right">
                                <div class="comment-content">{{cmt.commentContent}}</div>
                                <div><button class="comments-reply-button" :index="'r'+cmt.commentId">回复Ta</button></div>
                                <div class='comments-reply'>
                                    <div v-for="rpl in cmt.replies" :key="rpl.commentId" class="comments-reply-item">
                                        <b>{{rpl.userName}} </b>回复：{{rpl.commentContent}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-dialog
                        :title="'回复'+chosenCommentName"
                        :visible.sync="dialogVisible"
                        width="25rem">
                        <el-input type="textarea" v-model="replyInput" placeholder="请输入您的评论"></el-input>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="closeDialog">取 消</el-button>
                            <el-button type="primary" @click="sendReply">发 送</el-button>
                        </span>
                    </el-dialog>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GoBackHead from '../../components/goBackHead';
import {getResourceDetailApi,sendCommentApi,deleteCommentApi,sendReplyApi} from '../../api/project';

export default {
    name: "ResourceDetail",
    components:{
        "GoBackHead": GoBackHead,
    },
    data(){
        return {
            resourceInfo:{},
            dialogVisible: false,
            commentInput:'',
            replyInput:'',
            chosenCommentName: '评论',
            comments:[]
        }
    },
    created(){
        // console.log(this.$route.params.id);
        // this.getResourceInfo();
        this.getResourceDetail();
    },
    computed:{
        getUserId(){
            // console.log(this.$store.state.userInfo.userName);
            return this.$store.state.userInfo.userName;
        },
        getResourceRepliesCount(){
            return this.comments.length;
        }
    },
    methods:{
        getResourceDetail(){
            getResourceDetailApi().then((result)=>{
                // console.log()
                this.resourceInfo = result.data.resource;
                this.comments = result.data.comments;
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        deleteResource(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        sendComment(){
            sendCommentApi({resourceId: this.resourceInfo.resourceId, content: this.commentInput}).then((result)=>{
                this.commentInput='';
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        handleOperate(e){
            let index = e.target.getAttribute("index");
            if(index!=null){
                let chosenCommentId = parseInt(index.substring(1,index.length));
                if(index[0]=='r'){
                    this.dialogVisible = true;
                    this.assignNameById(chosenCommentId);
                }
                else{
                    this.deleteComment(chosenCommentId);
                }
                // console.log(id, index[0]);
            }
        },
        assignNameById(chosenCommentId){
            for(let comment of this.comments){
                if(comment.commentId==chosenCommentId){
                    this.chosenCommentName = comment.userName;
                    return ;
                }
            }
        },
        deleteComment(chosenCommentId){
            deleteCommentApi({commentId: chosenCommentId}).then((result)=>{
                for(let i=0;i<this.comments.length;i++){
                    if(this.comments[i].commentId==chosenCommentId){
                        this.comments.splice(i,1);
                        break;
                    }
                }
            }).catch((reason)=>{
                this.$message.error(reason);
            })
            
        },
        sendReply(){
            sendReplyApi({resourceId: this.resourceInfo.resourceId}).then((result)=>{
                this.$message({
                    type: 'success',
                    message: '回复成功',
                    duration: 800,
                    onClose:()=>{this.closeDialog();}
                });
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        closeDialog(){
            this.replyInput = '',
            this.dialogVisible = false;
        }
    }
}
</script>


<style lang="less">
@import "../../assets/css/common.less";
.resource-detail-title{
    border-left: @main-color solid .5rem;
    background-color: @support-color-bg ;
    margin: 1rem;
    padding: .1rem 1rem;
}

.resource-detail-description{
    display: flex;
    padding: 2rem;
}

.resource-detail-description-pic{
    width: 20rem;
    // background: green;
}

.resource-detail-description-text{
    flex: 1;
    color: #555555;
    line-height: 2rem;
}

.resource-detail-description-delete{
    float: right;
}

.resource-cover-page{
    width: 10rem;
    height: 12rem;
    margin: auto;
    background-image: url('~@/assets/img/file_type_1.png');
    background-repeat: no-repeat;
}

.resource-detail-show{
    display: flex;
    flex-wrap: wrap;
    display: -webkit-flex; /* Safari */
}

.resource-detail-overview{
    width: 60%;
    min-width: 40rem;
    height: calc(100vh);
    margin: 1rem;
    border: solid .2rem #cccccc;
    border-radius: 1rem;
    box-shadow: #aaaaaa 0 0 1rem;
    padding: 3rem 2rem;
}

.resource-detail-overview-frame{
    width: 100%;
    height: calc(100vh);
    border: #aaaaaa solid 2px;
    overflow: scroll;
}

.resource-detail-comments{
    flex:1;
    margin: 0 1rem;
}

.comments-input{
    background-color: #f5f5f5;
    margin: 1rem;
    padding: .5rem;
    border-radius: 2rem;
    display: flex;
    font-size: .8rem;
}

.comments-input-pre-icon{
    color:#888888;
    font-size: 1.2rem;
}

.comments-input-content{
    flex:1;
    color: #555555;
    background-color: transparent;
    border:none;
    outline: none;
    margin:0 .5rem;
}

.comments-send-button{
    width: 2.8rem;
    color: white;
    background-color: @support-color-ps;
    border: none;
    border-radius: 1rem;
    outline: none;
    padding: .3rem .5rem;
}

.comments-send-button:hover{
    background-color: @main-color;
}


.comments-item-right{
    margin-left: 3rem;
    border-bottom: solid #eeeeee .1rem;
    padding-bottom: .8rem;
}

.comments-item{
    font-size: .8rem;
    color: #888888;
    padding: .5rem auto;
}

.comments-item-right{
    margin-bottom: 1rem;
}

.comment-avatar{
    background-color: @support-color-ps;
    font-size: .7rem;
}

.comment-operate{
    float: right;
    margin: .5rem;
}

.comments-item .el-icon-delete:hover{
    color: #F56C6C;
}

.comment-content{
    font-size: .9rem;
    line-height: 1.2rem;
    color: #444444;
}

.comments-reply{
    color:#666666;
    background-color: #f5f5f5;
}

.comments-reply-item{
    padding: .5rem;
}

.comments-reply-button{
    outline: none;
    border: none;
    margin: .5rem 0;
    padding: 0;
    color:@support-color-ps;
    background-color: transparent;
}

.comments-reply-button:hover{
    color: @main-color;
}


</style>