import Mock from 'mockjs'
import loginApi from './user'
import infoApi from './profile'
import teamApi from './team'

/**
 * Mock.mock( rurl, rtype, template )
 * rurl:请求的接口地址
 * rtype:提交方式
 * template:返回数据
 */ 

 Mock.mock("http://localhost:8080/user/login", "post", loginApi.login_result_suc);
//  Mock.mock("http://localhost:8080/user/login", "post", loginApi.login_result_fai);

 Mock.mock("http://localhost:8080/user/register", "post", loginApi.register_result_suc);
//  Mock.mock("http://localhost:8080/user/register", "post", loginApi.register_result_fai);

 Mock.mock("http://localhost:8080/user/forget", "post", loginApi.forget_result_suc);
//  Mock.mock("http://localhost:8080/user/forget", "post", loginApi.forget_result_fai);

Mock.mock("http://localhost:8080/profile/pswd", "post", infoApi.change_pswd_suc);
// Mock.mock("http://localhost:8080/profile/pswd", "post", infoApi.change_pswd_fai);

Mock.mock("http://localhost:8080/profile/info", "post", infoApi.change_info_suc);
// Mock.mock("http://localhost:8080/profile/info", "post", infoApi.change_info_fai);

Mock.mock("http://localhost:8080/team/getTeams", "post", teamApi.get_teams_suc);
// Mock.mock("http://localhost:8080/team/getTeams", "post", teamApi.get_teams_fai);

Mock.mock("http://localhost:8080/team/getProjects", "post", teamApi.get_projects_suc);
// Mock.mock("http://localhost:8080/team/getProjects", "post", teamApi.get_projects_fai);

Mock.mock("http://localhost:8080/team/createTeam", "post", teamApi.create_team_suc);
// Mock.mock("http://localhost:8080/team/createTeam", "post", teamApi.create_team_fai);

Mock.mock("http://localhost:8080/team/createProject", "post", teamApi.create_project_suc);
// Mock.mock("http://localhost:8080/team/createProject", "post", teamApi.create_project_fai);