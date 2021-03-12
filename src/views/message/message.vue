<template>
    <el-row>
        <el-col :span='6'>
            <div class='contact-head'>
                <button @click="changeToPrivate" :class="{'message-button':true,'chosen-button':isPrivateChosen}">私聊</button>
                <button @click="changeToTeam" :class="{'message-button':true,'chosen-button':!isPrivateChosen}">群聊</button>
            </div>
            <div class='contacts-items'>
                <div v-if="isPrivateChosen" @click="handleContactChosen">
                    <div v-for="msg in myPrivateMessage" :key="msg.chatWithId" class='contact-item' >
                        <el-col :span='6'>
                            <el-avatar :size="50">{{msg.sender}}</el-avatar>
                            <el-badge v-if="msg.notReadNum" :value="msg.notReadNum" :max="99" class='contact-badge'></el-badge>
                        </el-col>
                        <el-col :span='17' :offset="1">
                            <div class='contact-time'>{{msg.latestTime}}</div>
                            <div class='contact-message'>{{msg.latestMessage}}</div>
                        </el-col>
                        <div class='contact-item-cover' :index="msg.chatWithId"></div>
                    </div>
                </div>
                <div v-else @click="handleTeamChosen">
                    <div v-for="msg in myTeamMessage" :key="msg.teamId" class='contact-item'>
                        <el-col :span='6'>
                            <el-avatar :size="50">{{msg.Team}}</el-avatar>
                            <el-badge v-if="msg.notReadNum" :value="msg.notReadNum" :max="99" class='contact-badge'></el-badge>
                        </el-col>
                        <el-col :span='17' :offset="1">
                            <div class='contact-time'>{{msg.latestTime}}</div>
                            <div class='contact-message'>{{msg.latestSender}}:{{msg.latestMessage}}</div>
                        </el-col>
                        <div class='contact-item-cover' :index="msg.teamId"></div>
                    </div>
                </div>
            </div>
            <!-- <div> -->
        </el-col>
        <el-col :span='18' class='message-body'>
            <div v-if="chatWithChosen==-1">

            </div>
            <div v-else>
                <div class='message-frame' id='message-frame' ref='message-frame'>
                    <div v-for="msg in messageRecord" :key="msg.mId" :class="{'message-item':true,'message-mine':getUserId==msg.senderId}">
                        <el-avatar class="message-avatar">{{msg.senderName}}</el-avatar>
                        <div class='message-description'>
                            <div class='message-time'>{{msg.sendTime}}</div>
                            <div class='message-content'>{{msg.content}}</div>
                        </div>
                    </div>
                </div>
                <el-input type="textarea" class='message-input-area' v-model="chatContent" ref='message-input-area'></el-input>
                <el-button type="primary" class="message-send-button" @click="sendMessage">发送</el-button>
            </div>
        </el-col>
    </el-row>
    
</template>

<script>
import {getPrivateChatApi, getTeamChatApi, getMessageRecordByIdApi, sendMessageApi} from '../../api/message'

export default {
    name: 'Message',
    data(){
        return {
            isPrivateChosen: true,
            chatWithChosen: -1,
            chatContent: '',
            messageCount: -1,
            myPrivateMessage:[],
            myTeamMessage: [],
            messageRecord:[]
        }
    },
    computed:{
        getUserId(){
            return this.$store.state.userInfo.userName;
        }
    },
    created(){
        this.getPrivateMessage();
        this.getTeamMessage();
    },
    methods:{
        getPrivateMessage(){
            getPrivateChatApi().then((result)=>{
                this.myPrivateMessage = result.data;
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        getTeamMessage(){
            getTeamChatApi().then((result)=>{
                this.myTeamMessage = result.data;
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        changeToPrivate(){
            if(!this.isPrivateChosen){
                this.isPrivateChosen = true;
                this.getPrivateMessage();
            }
        },
        changeToTeam(){
            if(this.isPrivateChosen){
                this.isPrivateChosen = false;
                this.getTeamMessage();
            }
        },
        handleContactChosen(e){
            let uId = e.target.getAttribute('index');
            if(uId){
                this.chatWithChosen = uId;
                this.getMessageRecordById({uId:uId, type:this.isPrivateChosen});
            }

        },
        handleTeamChosen(e){
            let uId = e.target.getAttribute('index');
            if(uId){
                this.chatWithChosen = uId;
                this.getMessageRecordById({uId:uId, type:this.isPrivateChosen});
            }
        },
        async getMessageRecordById(uId){
            await getMessageRecordByIdApi(uId).then((result)=>{
                this.messageRecord = result.data;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
            this.toBottom();
        },
        sendMessage(){
            if(this.chatContent){
                let param = {
                    sender: this.getUserId,
                    receiver: this.chatWithChosen, 
                    type: this.isPrivateChosen
                };
                sendMessageApi(param).then((result)=>{
                    this.pushMessage();
                    this.chatContent = '';
                    
                }).catch((reason)=>{
                    console.log('there');
                    this.$message.error(reason);
                })
            }
        },
        async pushMessage(){
            let time = new Date();
            await this.messageRecord.push({
                messageId:this.messageCount--, 
                senderId: this.getUserId, 
                senderName: "赵天泽", 
                sendTime: time, 
                messageType: 1, 
                content: this.chatContent
            });
            this.toBottom();
        },
        toBottom(){
            this.$refs['message-frame'].scrollTo(0,this.$refs['message-frame'].scrollHeight);
        },
    }
}
</script>

<style scoped>

.contact-head{
    display: flex;
}

.message-button{
    border: none;
    height: 1.6rem;
    flex:1;
    outline:none;
    color: #555555;
    border-radius: 2rem;
    margin: 0.2rem 1rem;
    background: #ffffff;
}

/* .el-checkbox__input.is-checked >>> el-checkbox__inner{} */
.chosen-button{
    background: #eeeeee;
}

.contacts-items{
    /* min-width: 12rem; */
    /* padding: 1rem; */
    height: calc(100vh - 4rem);
    overflow: scroll;
    border-right: #dddddd solid 0.1rem;
}

.contact-item{
    height: 3rem;
    border-radius: 2rem;
    overflow: hidden;
    padding: 0.7rem;
}

.contact-item:hover{
    background: #f5f5f5;
}


.contact-item-cover{
    height:100%;
    width: 100%;
    padding: 0.7rem;
    top: -0.7rem;
    left: -0.7rem;
    position: relative;
    z-index: 1;
    /* background: rosybrown; */
}


.contact-badge{
    position: relative;
    top: -3rem;
    left: 2.6rem;
}

.contact-time{
    float: right;
    font-size: 0.5rem;
    color: #aaaaaa;
}

.contact-message{
    font-size: 0.9rem;
    color: #888888;
    margin-top: 1.5rem;
    line-height: 2rem;
}

.message-body{
    padding: 1rem;
}

.message-frame{
    width: 90%;
    height: calc(100vh - 14rem);
    margin: auto;
    background: #fafafa;
    border-radius: 1rem;
    box-shadow: #aaaaaa 0 0 0.4rem;
    overflow: scroll;
    padding: 1rem;
}

.message-item{
    /* width: 80%; */
    display: flex;
    justify-content: stretch;
    margin: 2rem auto;
}

.message-mine{
    flex-direction: row-reverse;
}

.message-avatar{
    font-size: 0.5rem;
    margin: 0.2rem;
}

.message-description{
    /* flex:1; */
    background: white;
    border-radius: 1rem;
    padding: 0.5rem;
    max-width: 50%;
}

.message-time{
    padding: 0.1rem;
    font-size: 0.4rem;
    color: #aaaaaa;
    text-align: center;
    border-bottom: #f0f0f0 solid 0.1rem;
    margin-bottom: 0.2rem;
}

.message-content{
    line-height: 1.5rem;
    color: #555555;
    font-size: 0.8rem;
}

.message-input-area>>>.el-textarea__inner{
    resize: none;/* 去掉 textarea 下面拉伸的标志*/
    width: 90%;
    height: 5rem;
    margin: 1rem auto;
}

.message-send-button{
    float: right;
    margin-right:5%;
}

</style>