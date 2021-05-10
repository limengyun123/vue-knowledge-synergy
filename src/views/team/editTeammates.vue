<template>
    <div>
        <GoBackHead />
        <div class='edit-permission-page'>
        <el-button type="primary" @click="changeState" :class="['change-permission-button', isEditing?'el-icon-download':'el-icon-edit']"></el-button>
        <el-table :data="teammates" class="team-permission-table" @cell-click="changePermission">
            <el-table-column prop="actualName" label="姓名" width="80"></el-table-column>
            <el-table-column prop="sex" label="性别" width="80">
                <template slot-scope="scope">
                        <span v-if="scope.row.sex">男</span>
                        <span v-else>女</span>
                    </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="joinTime" label="入群时间" width="150"></el-table-column>
            <el-table-column prop="permission" label="成员权限" >
                <el-table-column label="设置团员权限" width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.permission[0]==1" class="el-icon-check"></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
                <el-table-column label="编辑团队" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.permission[1]==1" class="el-icon-check" ></span>
                        <span v-else class="el-icon-close" ></span>
                    </template>
                </el-table-column>
                <el-table-column label="发布公告" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.permission[2]==1" class="el-icon-check"></span>
                        <span v-else class="el-icon-close" ></span>
                    </template>
                </el-table-column>
                <el-table-column label="项目权限" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.permission[3]==1" class="el-icon-check" ></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
                <el-table-column label="资源权限" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.permission[4]==1" class="el-icon-check" ></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
                <el-table-column label="任务权限" width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.permission[5]==1" class="el-icon-check"></span>
                        <span v-else class="el-icon-close"></span>
                    </template>
                </el-table-column>
                <el-table-column label="查看成员贡献" width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.permission[6]==1" class="el-icon-check" ></span>
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
import {getTeammateInfoApi} from '../../api/team';

export default {
    name: 'EditTeammates',
    components:{
        'GoBackHead': GoBackHead
    },
    data(){
        return {
            isEditing: false,
            teammates:[
                {
                    id: 481933,
                    actualName: '赵浩',
                    sex: true,
                    email: '47828743@qq.com',
                    phone: '18573829753',
                    joinTime: '2020-09-21 18:42',
                    permission:[1,1,1,1,1,1,1]
                },
                {
                    id: 53454,
                    actualName: '钱正来',
                    sex: false,
                    email: '4756@qq.com',
                    phone: '15083927492',
                    joinTime: '2020-09-21 18:42',
                    permission:[1,0,1,0,1,0,0]
                },
            ],
        }
    },
    methods:{
        changeState(){
            this.isEditing = !this.isEditing;
            if(!this.isEditing){
                this.$message.success('修改成功');
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
                    if(item.permission[index] === 1){
                        item.permission[index] = 0;
                        cell.innerHTML = "<div class='cell'><span class='el-icon-close'></span></div>";
                    }
                    else{
                        item.permission[index] = 1;
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