<template>
    <div>
        <GoBackHead />
        <div class="upload-resource-body">
            <div>
                <input type="file" @change="chooseFile($event)" multiple="multiplt" id="chosen-resource-button-hidden">
                <button @click="chooseFileClick" class="chosen-resource-button">选择文件</button>
                <button @click="submitUpload" class="upload-resource-button">上传</button>
            </div>
            <div class="choose-resource-tooltip">
                一次只能上传1个pdf/ppt/pptx/doc/docx/xls/xlsx/jpg/jpeg/png/rar/zip文件，且不超过3M
            </div>
            <div class='upload-resource-show' @click="handleRemove">
                <transition-group name="resources-list" >
                <div v-for="file in fileList" :key='file.signId' class='upload-resource-item'>
                    <span class="file-item-name" :title="file.name">{{file.name}}</span>
                    <span class="el-icon-remove upload-resource-delete-icon" :index="file.signId"></span>
                </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import GoBackHead from '../../components/goBackHead';
import {uploadResourcesApi} from '../../api/project';

export default {
    name: "UploadResource",
    components:{
        'GoBackHead': GoBackHead
    },
    data() {
        return {
            fileIdCount: 0,
            fileMaxCount: 1,
            fileList: []
        };
    },
    methods: {
        chooseFileClick(){
            document.querySelector('#chosen-resource-button-hidden').click();
        },
        chooseFile(e){
            // console.log(this.fileList);
            const validFileType = ['pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'zip', 'rar'];
            let files = e.target.files;
            if(this.fileList.length+files.length>this.fileMaxCount){
                this.$message.error(`最多能上传${this.fileMaxCount}个文件`);
                return ;
            }
            
            for(let file of files){
                let name = file.name;
                let size = file.size;
                if(size <= 5242880){
                    let index = name.lastIndexOf(".");  
                    if(index != -1){
                        let fileType = name.substr(index+1).toLowerCase();
                        if(validFileType.indexOf(fileType)!=-1 && this.fileList.length<=this.fileMaxCount){
                            file['signId'] = ++this.fileIdCount;
                            this.fileList.push(file);
                        } else this.$message.error(name+"文件类型不符合");
                    } else this.$message.error(name+"文件类型不符合");
                } else this.$message.error(name+"文件不应大于5M");
            }
        },
        submitUpload(){
            // console.log(this.fileList);
            if(this.fileList.length){
                let formData = new FormData();
                formData.append('projectId',this.$route.params.id);
                formData.append('fileList',this.fileList[0]);
                // this.fileList.forEach((file,index) => {
                //     formData.append(`file_${index}`,file);
                // });

                uploadResourcesApi(formData).then((result)=>{
                    this.$message({
                        type: 'success',
                        message: "成功上传文件",
                        duration: 800,
                        onClose: ()=>{this.fileList = [];}
                    });
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
            }
            else
                this.$message.error("请选择需要上传的文件");
        },
        handleRemove(e) {
            let index = e.target.getAttribute('index');
            if(index!=null){
                index = parseInt(index);
                for(let i=0;i<this.fileList.length;i++){
                    if(this.fileList[i].signId==index){
                        this.fileList.splice(i,1);
                        break;
                    }
                }
            }
        },

    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.upload-resource-body{
    width:30rem;
    margin: 2rem auto;
}
#chosen-resource-button-hidden{
    display: none;
}

.chosen-resource-button{
    outline:none;
    padding: 0.6rem 1rem;
    background-color: white;
    color: #888888;
    border: solid 0.1rem #dddddd;
    border-radius: 0.3rem;
}

.chosen-resource-button:hover{
    background-color:@support-color-bg;
}

.upload-resource-button{
    outline:none;
    padding: 0.6rem 1rem;
    background-color: @support-color-ps;
    color: white;
    border: solid 0.1rem #dddddd;
    border-radius: 0.3rem;
    float: right;
}

.upload-resource-button:hover{
    background-color:@main-color;
}

.choose-resource-tooltip{
    font-size: 0.8rem;
    color: #aaaaaa;
    margin: .8rem auto;
}
.upload-resource-show{
    height:22rem;
    overflow: scroll;
}

.upload-resource-item{
    color: #888888;
    margin: .3rem auto;
    padding: .5rem;
}

.file-item-name{
    display: inline-block;
    width: 25.5rem;
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: none;
}

.upload-resource-item:hover{
    background-color: @support-color-bg ;
    border-radius: .3rem;
}

.upload-resource-delete-icon{
    display: inline-block;
    margin-left: 1rem;
    // margin-right: 1rem;
}

.upload-resource-delete-icon:hover{
    color: #F56C6C;
}

.resources-list-enter-active, .resources-list-leave-active {
    transition: all .8s;
}
.resources-list-enter, .resources-list-leave-to{
    opacity: 0;
    transform: translateY(-30px);
}
</style>