<template>
    <div>
        <GoBackHeader />
        <div class="form-body">
            <el-form :model="myShorthand" status-icon :rules="infoRules" ref='myShorthand' label-width="100px">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="myShorthand.title" autocomplete="off" class="input-title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input type="textarea" v-model="myShorthand.content" autocomplete="off" class="input-content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitShorthand">确认修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import GoBackHeader from '../../components/goBackHead';
import {getAShorthandApi, editShorthandApi} from '../../api/individual';

export default {
    name: 'EditShorthand',
    components:{
        GoBackHeader: GoBackHeader
    },
    data(){
        return {
            myShorthand:{
                sId:-1,
                title: '',
                content: '',
                time: ''
            },
            infoRules:{
                title:[
                    {
                        min: 2,
                        max: 30,
                        message: "请输入2-30个字符",
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: 'blur'
                    }
                ],
                content:[
                    {
                        min: 0,
                        max: 300,
                        message: "请输入300个字符以内的内容",
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    created(){
        let sId = this.$route.params.id;
        if(sId){
            let sh = this.$store.state.shortHandChosen;
        
            if(JSON.stringify(sh) !== '{}' && sId==sh.sId){
                this.myShorthand = sh;
                // console.log('from store');
            }
            else{
                getAShorthandApi(sId).then((result)=>{
                    this.myShorthand = result.data;
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
                // console.log('from request');
            }
        }else{
            this.$router.push('/errorPage');
        }
        
    },
    methods:{
        submitShorthand(){
            this.$refs['myShorthand'].validate((valid)=>{
                if(valid){
                    editShorthandApi(this.myShorthand).then((result)=>{
                        this.$message.success(result.msg);
                    }).catch((reason)=>{
                        this.$message.success(reason);
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.form-body{
    width: 30rem;
    margin: 3rem auto 1rem;
}

.input-content>>>.el-textarea__inner {
    height: 14rem;
}

</style>