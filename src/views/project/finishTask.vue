<template>
    <div>
        <GoBackHead />
        <div class="finish-task-body">
            <el-form :model="task" ref="task" status-icon label-width="100px" >
                <el-form-item label="指派人" prop="assignerName">
                    <el-input v-model="task.assignerName" disabled></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="startTime">
                    <el-date-picker v-model="task.startTime" type="datetime"  disabled> </el-date-picker>
                </el-form-item>
                <el-form-item label="截止时间" prop="deadline">
                    <el-date-picker v-model="task.deadline" type="datetime" disabled> </el-date-picker>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="task.description" disabled></el-input>
                </el-form-item>
                <el-form-item label="上传任务文件" prop="taskUpload">
                    <div>
                        <input type="file" @change="chooseFile($event)" multiple="multiplt" id="chosen-task-resource-button-hidden">
                        <button @click="chooseFileClick" class="chosen-resource-button">选择文件</button>
                        <button @click="submitUpload" class="upload-resource-button">上传</button>
                    </div>
                    <div class="choose-resource-tooltip">
                        只能上传<b>1</b>个pdf/doc/docx/ppt/pptx/txt/xls/xlsx/jpg/jpeg/png/zip/rar文件,若有多个文件，请打包。
                    </div>
                    <div class='upload-resource-show'>{{taskFile.name}}</div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import GoBackHead from '../../components/goBackHead';
import {uploadResourcesApi} from '../../api/project';

export default {
    name: "FinishTask",
    components:{
        'GoBackHead': GoBackHead
    },
    data() {
        return {
            task:{},
            taskFile: {}
        };
    },
    methods: {
        chooseFileClick(e){
            e.preventDefault();
            document.querySelector('#chosen-task-resource-button-hidden').click();
        },
        chooseFile(e){
            e.preventDefault();
            const validFileType = ['pdf', 'doc', 'docx','ppt', 'pptx', 'txt', 'xls', 'xlsx', 'jpg', 'jpeg', 'png'];
            let files = e.target.files;
            
            if(files.length>1){
                this.$message.error(`只能上传1个文件`);
                return ;
            }
            let file = files[0];
            let name = file.name;
            let size = file.size;
            if(size <= 5242880){
                let index = name.lastIndexOf(".");  
                if(index != -1){
                    let fileType = name.substr(index+1).toLowerCase();
                    if(validFileType.indexOf(fileType)!=-1 ){
                        this.taskFile = file;
                        console.log(this.taskFile);
                    } else this.$message.error(name+"文件类型不符合");
                } else this.$message.error(name+"文件类型不符合");
            } else this.$message.error(name+"文件不应大于5M");
        },
        submitUpload(e){
            e.preventDefault();
            let formData = new FormData();
            formData.append(`file_task`,this.taskFile);

            uploadResourcesApi({pId:1, fileList: formData}).then((result)=>{
                this.$message({
                    type: 'success',
                    message: "提交成功",
                    duration: 800,
                    onClose: ()=>{
                        this.taskFile = {};
                        this.$router.back(-1);
                    }
                });
            }).catch((reason)=>{
                this.$message.error(reason);
            });

        },

    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.finish-task-body{
    width:30rem;
    margin: 2rem auto;
}

#chosen-task-resource-button-hidden{
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
    line-height: 1.2rem;
}
.upload-resource-show{
    font-size: 1.2rem;
    color: #555555;
}

.upload-resource-item{
    color: #888888;
    margin: .3rem auto;
    padding: .5rem;
}


.upload-resource-item:hover{
    background-color: @support-color-bg ;
    border-radius: .3rem;
}

</style>