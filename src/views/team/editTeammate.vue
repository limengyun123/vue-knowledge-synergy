<template>
    <div>
        <GoBackHead />
        <div>
            <div class='eidt-teammate-title'><h3>基本信息</h3></div>
            <div class="project-permission-table">
                <div>
                    <div><span>成员ID</span><span>{{teammateInfo.id}}</span></div>
                    <div><span>真实姓名</span><span>{{teammateInfo.actualName}}</span></div>
                    <div><span>性别</span><span>{{teammateInfo.sex}}</span></div>
                    <div><span>邮箱</span><span>{{teammateInfo.email}}</span></div>
                    <div><span>电话</span><span>{{teammateInfo.phone}}</span></div>
                    <div><span>入队时间</span><span>{{teammateInfo.joinTime}}</span></div>
                </div>
            </div>
        </div>
        <div>
            <div class='eidt-teammate-title'><h3>团队权限</h3></div>
            <div class="project-permission-table">
                <el-form>
                <div><span>队内职位</span><span>{{teamPermission.position}}</span></div>
                <div><span>编辑团队信息</span><span>{{teamPermission.editTeam}}</span></div>
                <div><span>添加队员</span><span>{{teamPermission.addTeammates}}</span></div>
                <div><span>编辑队员信息</span><span>{{teamPermission.editTeammate}}</span></div>
                <div><span>创建项目</span><span>{{teamPermission.createProject}}</span></div>
                </el-form>
            </div>
        </div>
        <div>
            <div class='eidt-teammate-title'><h3>项目权限</h3></div>
            <div>
                <el-table :data="projectPermission" class="project-permission-table">
                    <el-table-column prop="projectName" label="项目名称" width="400"></el-table-column>
                    <el-table-column prop="permissionEdit" label="编辑项目" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionEdit" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="permissionTask" label="分配任务" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.permissionTask" class="el-icon-check" :index="scope.row.projectId"></span>
                            <span v-else class="el-icon-close" :index="scope.row.projectId"></span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
            teammateInfo:{
                id: 481933,
                actualName: '赵浩',
                sex: true,
                email: '47828743@qq.com',
                phone: '18573829753',
                joinTime: '2020-09-21 18:42'
            },
            teamPermission:{
                position: '管理员',
                editTeam: true,
                addTeammates: true,
                editTeammate: true,
                createProject: false
            },
            projectPermission:[
                // 编辑项目信息（归档/删除等）、分配任务
                { projectId: 3, projectName: "河北省公路地质灾害预警系统的初步构建", permissionEdit: true, permissionTask: false},
                { projectId: 4, projectName: "新民居建设对耕地利用的影响调查研究",  permissionEdit: false, permissionTask: true},
                { projectId: 5, projectName: "中西方高等教育背景下大学生创业意识的比较研究",  permissionEdit: true, permissionTask: false},
                { projectId: 6, projectName: "有限元强度折减法在边坡稳定性中的应用研究",  permissionEdit: true, permissionTask: true},
            ]

        }
    }
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

.project-permission-table{
    box-shadow: #dddddd 0 0 0.4rem;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
    margin-bottom: 2rem;
}

.project-permission-table .el-icon-check{
    font-size: 1.5rem;
    color: @success-color;
}

.project-permission-table .el-icon-close{
    font-size: 1.5rem;
    color: @danger-color;
}

</style>