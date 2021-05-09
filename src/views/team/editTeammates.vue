<template>
    <div>
        <GoBackHead />
        <div class="team-permission-table">
            <el-table :data="teammates">
                <el-table-column prop="actualName" label="姓名" width="80"> </el-table-column>
                <el-table-column prop="sex" label="性别" width="80">
                    <template slot-scope="scope">
                            <span v-if="scope.row.sex">男</span>
                            <span v-else>女</span>
                        </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
                <el-table-column prop="joinTime" label="入群时间" width="150"> </el-table-column>
                <el-table-column label="成员权限" >
                    <el-table-column prop="permissionEdit" label="设置团员权限" width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionEdit" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="permissionTask" label="编辑团队" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionTask" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="permissionTask" label="发布公告" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionTask" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="permissionTask" label="项目权限" width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionTask" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="permissionTask" label="资源权限" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionTask" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="permissionTask" label="任务权限" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionTask" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="permissionTask" label="查看成员贡献" width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionTask" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
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
            teammates:[
                {
                    id: 481933,
                    actualName: '赵浩',
                    sex: true,
                    email: '47828743@qq.com',
                    phone: '18573829753',
                    joinTime: '2020-09-21 18:42'
                },
                {
                    id: 53454,
                    actualName: '钱正来',
                    sex: false,
                    email: '4756@qq.com',
                    phone: '15083927492',
                    joinTime: '2020-09-21 18:42'
                },
            ]
        }
    },
    computed:{
        teamChosenId: function (){
            return this.$store.state.teamInfo.teamChosenId;
        }
    },
}
</script>

<style lang="less">
@import "../../assets/css/common.less";
.eidt-teammate-title{
    border-left: @main-color solid .5rem;
    background-color: @support-color-bg ;
    margin: 1rem;
    padding: .1rem 1rem;
}

.team-permission-table{
    box-shadow: #dddddd 0 0 0.4rem;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
    margin: 2rem;
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