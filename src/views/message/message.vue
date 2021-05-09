<template>
    <el-row>
        <el-col :span='6'>
            <div class='contact-head'>
                <button @click="changeToPrivate" :class="{'message-button':true,'chosen-button':!isTeamChosen}">私聊</button>
                <button @click="changeToTeam" :class="{'message-button':true,'chosen-button':isTeamChosen}">群聊</button>
            </div>
            <div class='contacts-items'>
                <div v-if="!isTeamChosen" @click="handleContactChosen">
                    <div v-for="msg in myPrivateMessage" :key="msg.chatWithId" class='contact-item' >
                        <el-col :span='6'>
                            <el-badge v-if="msg.notReadNum" :value="msg.notReadNum" :max="99">
                                <el-avatar :size="50">{{msg.sender}}</el-avatar>
                            </el-badge>
                            <el-avatar v-else :size="50">{{msg.sender}}</el-avatar>
                        </el-col>
                        <el-col :span='17' :offset="1">
                            <div class='contact-time'>{{msg.latestTime}}</div>
                            <div class='contact-message' >{{msg.latestMessage}}</div>
                        </el-col>
                        <div class='contact-item-cover' :index="msg.chatWithId"></div>
                    </div>
                </div>
                <div v-else @click="handleContactChosen">
                    <div v-for="msg in myTeamMessage" :key="msg.teamId" class='contact-item'>
                        <el-col :span='6'>
                            <el-badge v-if="msg.notReadNum" :value="msg.notReadNum" :max="99">
                                <el-avatar :size="50">{{msg.team}}</el-avatar>
                            </el-badge>
                            <el-avatar v-else :size="50">{{msg.team}}</el-avatar>
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
            <div v-if="chatWithChosen==0">

            </div>
            <div v-else>
                <div class="send-message-to">TO: {{chatWithName}}</div>
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
            isTeamChosen: false,
            chatWithChosen: 0,
            chatWithName: '',
            chatContent: '',
            messageCount: -1,
            myPrivateMessage:[],
            myTeamMessage: [],
            messageRecord:[]
        }
    },
    computed:{
        getUserId(){
            return this.$store.state.userInfo.id;
        }
    },
    created(){
        this.isTeamChosen = this.$store.state.chatInfo.isTeam;
        this.chatWithChosen = this.$store.state.chatInfo.chatId;
        if(this.isTeamChosen) this.getTeamMessage();
        else this.getPrivateMessage();
    },
    methods:{
        async getPrivateMessage(){
            await getPrivateChatApi().then((result)=>{
                this.myPrivateMessage = result.data;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
            this.handleMessageChosen();
        },
        async getTeamMessage(){
            await getTeamChatApi().then((result)=>{
                this.myTeamMessage = result.data;
            }).catch((reason)=>{
                this.$message.error(reason);
            });
            this.handleMessageChosen();
        },
        changeToPrivate(){
            if(this.isTeamChosen){
                this.isTeamChosen = false;
                this.getPrivateMessage();
            }
        },
        changeToTeam(){
            if(!this.isTeamChosen){
                this.isTeamChosen = true;
                this.getTeamMessage();
            }
        },
        handleContactChosen(e){
            let uId = e.target.getAttribute('index');
            if(uId!=null){
                uId = parseInt(uId);
                this.chatWithChosen = uId;
                this.handleMessageChosen();
            }
        },
        handleMessageChosen(){
            if(this.chatWithChosen!=0){
                if(this.isTeamChosen)
                    this.chatWithName = this.myTeamMessage.find((item)=>{return this.chatWithChosen==item.teamId}).team;
                else
                    this.chatWithName = this.myPrivateMessage.find((item)=>{return this.chatWithChosen==item.chatWithId}).sender;
                this.getMessageRecordById({id:this.chatWithChosen, type:this.isTeamChosen});
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
                    type: this.isTeamChosen
                };
                sendMessageApi(param).then((result)=>{
                    this.pushMessage();
                    this.chatContent = '';
                    
                }).catch((reason)=>{
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

<style lang="less">
@import "../../assets/css/common.less";

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
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.send-message-to{
    margin: 0 1rem 1rem;
    font-size: 1.2rem;
    color: #555555;
}

.message-body{
    padding: 1rem;
}

.message-frame{
    width: 90%;
    height: calc(100vh - 16rem);
    margin: auto;
    background: @support-color-bg;
    border-radius: 1rem;
    box-shadow: #cccccc 0 0 .5rem;
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

.message-body .el-textarea__inner{
    width: 90%;
    height: 5rem;
    margin: 1rem auto;
}

.message-send-button{
    float: right;
    margin-right:5%;
}

</style>