<template>
    <div>
        <GoBackHead />
        <div class='notification-page'>
            <!-- 邀请加入团队/回复邀请/创建项目/评论资源/回复评论/分配任务/接收任务/完成任务/项目状态改变 -->
            <div class='notification-head'>
                <button :class="{'active':!readSign}" @click="changeToUnread">未读</button>
                <button :class="{'active':readSign}" @click="changeToRead">所有</button>
            </div>
            <div class="notification-body" @click="handleRead">
                <div v-for="item in notices" :key="item.id" class='notification-item'>
                    <div class="notification-item-content">
                        <p>{{item.content}}<p>
                        <div class='notification-item-content-time'>{{item.createTime}}</div>
                    </div>
                    <div v-if="!item.status" title="标为已读" class='el-icon-circle-check sign-read-icon' :index="item.id"></div>
                    <!-- <span></span> -->
                </div>
            </div>
            <el-pagination
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
    </div>
</template>
<script>
import GoBackHead from '../../components/goBackHead';
import {getNotificationsApi, readNotificationApi} from '../../api/profile';

export default {
    name: "Notification",
    components: {
        'GoBackHead': GoBackHead
    },
    data(){
        return {
            readSign: false,
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 3,
                pagerCount: 7
            },
            notices:[]
        }
    },
    created(){
        this.getNotifications();
    },
    methods:{
        getNotifications(){
            getNotificationsApi({
                read: this.readSign, 
                currentPage: this.paginationInfo.currentPage, 
                pageSize: this.paginationInfo.pageSize
            }).then((result)=>{
                this.notices = result.data.notices||[];
                this.paginationInfo.totalNum = result.data.totalNum;
            }).catch((reason=>{
                this.$message.error(reason);
            }));
        },
        changeToUnread(){
            if(this.readSign){
                this.readSign = false;
                this.getNotifications();
            }
        },
        changeToRead(){
            if(!this.readSign){
                this.readSign = true;
                this.getNotifications();
            }
        },
        handleRead(e){
            let index = e.target.getAttribute("index");
            if(index!=null){
                index = parseInt(index);
                readNotificationApi({id: index}).then((result)=>{
                    /*正常逻辑
                        this.getNotifications();
                     */

                    // 测试使用
                    for(let i=0;i<this.notices.length;i++){
                        if(this.notices[i].id==index){
                            this.notices.splice(i,1);
                            return ;
                        }
                    }
                }).catch((reason)=>{
                    this.$message.error(reason);
                })
                
            }
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getNotifications();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getNotifications();
        },
    }
} 
</script>

<style lang="less">
@import "../../assets/css/common.less";

.notification-page{
    height: calc(100vh - 3.8rem);
    overflow: scroll;
}

.notification-head{
    /* height: 3rem; */
    text-align: center;
}

.notification-head button{
    width: 18rem;
    outline:none;
    margin: 1rem 0;
    padding: 0.6rem 1rem;
    background-color: white;
    color: #888888;
    border: none;
    // border-radius: 1rem;
}
.notification-head button:hover{
    color: @main-color;
}

.notification-head .active{
    color: @main-color;
    background-color: @support-color-ps;
    background-image: radial-gradient(@support-color-ps,white);
}

.notification-item{
    margin: 2rem 5%;
    padding: 0.5rem 2rem;
    border: solid 1px #eeeeee;
    box-shadow: #dddddd 0 0 .6rem;
    border-radius: .5rem;
    color: #555555;
    display: flex;
}

.notification-item-content{
    flex: 1;
    line-height: 1.5rem;
}

.notification-item-content-time{
    color:#888888;
    font-size: .8rem;
}

.sign-read-icon{
    margin-left: 1rem;
    margin-top: 1rem;
    font-size: 2rem;
    color:#888888;
}

.sign-read-icon:hover{
    color: #67C23A;
}

.pagination{
    margin: 2rem 0;
    text-align: center;
}

</style>
