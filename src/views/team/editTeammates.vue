<template>
    <div>
        <GoBackHead />
        <div class='edit-permission-page'>
        <el-button type="primary" @click="changeState" :class="['change-permission-button', isEditing?'el-icon-download':'el-icon-edit']"></el-button>
        <el-table :data="teammates" class="team-permission-table" @cell-click="changePermission">
            <el-table-column prop="actualName" label="姓名" width="80"></el-table-column>
            <el-table-column prop="sex" label="性别" width="50">
                <template slot-scope="scope">
                        <span v-if="scope.row.sex">男</span>
                        <span v-else>女</span>
                    </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="enterTime" label="入群时间" width="180"></el-table-column>
            <el-table-column prop="authority" label="成员权限" >
                <el-table-column label="设置团员权限" width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authority[0]=='1'" class="el-icon-check"></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
                <el-table-column label="编辑团队" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authority[1]=='1'" class="el-icon-check" ></span>
                        <span v-else class="el-icon-close" ></span>
                    </template>
                </el-table-column>
                <el-table-column label="发布公告" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authority[2]=='1'" class="el-icon-check"></span>
                        <span v-else class="el-icon-close" ></span>
                    </template>
                </el-table-column>
                <el-table-column label="项目权限" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authority[3]=='1'" class="el-icon-check" ></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
                <el-table-column label="资源权限" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authority[4]=='1'" class="el-icon-check" ></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
                <el-table-column label="任务权限" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authority[5]=='1'" class="el-icon-check"></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
                <el-table-column label="查看成员贡献" width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authority[6]=='1'" class="el-icon-check" ></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
import GoBackHead from '../../components/goBackHead';
import {getAuthorityApi, editAuthorityApi} from '../../api/team';

export default {
    name: 'EditTeammates',
    components:{
        'GoBackHead': GoBackHead
    },
    data(){
        return {
            isEditing: false,
            teammates:[],
        }
    },
    computed:{
        teamId(){
            return this.$store.state.teamInfo.teamChosenId;
        }
    },
    created(){
        getAuthorityApi({teamId: this.teamId}).then((result)=>{
            this.teammates = result.data || [];
            for(let mate of this.teammates){
                let len = mate.authority.length;
                mate.authority = mate.authority+'0'.repeat(7-len);
            }
            // console.log(this.teammates);
        }).catch((reason)=>{
            this.$message.error(reason);
        })
    },
    methods:{
        changeState(){
            this.isEditing = !this.isEditing;
            if(!this.isEditing){
                editAuthorityApi({
                    teamId: this.teamId,
                    changes: this.teammates.map((item)=>{
                        return {id:item.id, authority:item.authority};
                    })
                }).then(()=>{
                    this.$message.success('权限修改成功');
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
            }
        },
        changePermission(row, column, cell, event){
            if(this.isEditing){
                let index = -1;
                switch(column.label){
                    case '设置团员权限':
                        index = 0;
                        break;
                    case '编辑团队':
                        index = 1;
                        break;
                    case '发布公告':
                        index = 2;
                        break;
                    case '项目权限':
                        index = 3;
                        break;
                    case '资源权限':
                        index = 4;
                        break;
                    case '任务权限':
                        index = 5;
                        break;
                    case '查看成员贡献':
                        index = 6;
                        break;
                    default:
                        break;
                }
                if(index!==-1) this.changePermissionById(row.id, index, cell); 
            }
            
        },
        changePermissionById(id, index, cell){
            for(let item of this.teammates){
                if(item.id==id){
                    if(item.authority[index] === '1'){
                        item.authority = item.authority.substring(0, index)+'0'+item.authority.substring(index + 1);
                        cell.innerHTML = "<div class='cell'><span class='el-icon-close'></span></div>";
                    }
                    else{
                        item.authority = item.authority.substring(0, index)+'1'+item.authority.substring(index + 1);
                        cell.innerHTML = "<div class='cell'><span class='el-icon-check'></span></div>";
                    }
                    cell.style.backgroundColor = '#f5f5f5';
                }

            }
        }
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.edit-permission-page{
    height: calc(100vh - 3.8rem);
    overflow: scroll;
}

.change-permission-button{
    float: right;
    margin: 1rem 4rem;
    font-size: 1.4rem;
    padding: .5rem 1rem;
}


.team-permission-table{
    box-shadow: #dddddd 0 0 0.4rem;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 2rem;
}

.team-permission-table .el-icon-check{
    font-size: 1.5rem;
    color: @success-color;
}

.team-permission-table .el-icon-close{
    font-size: 1.5rem;
    color: @danger-color;
}

</style>