import Mock from 'mockjs'
import loginApi from './user'
import infoApi from './profile'
import teamApi from './team'
import projectApi from './project'

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

Mock.mock("http://localhost:8080/team/getTeamInfo", "post", teamApi.get_team_info_suc);
// Mock.mock("http://localhost:8080/team/getTeamInfo", "post", teamApi.get_team_info_fai);

Mock.mock("http://localhost:8080/team/createTeam", "post", teamApi.create_team_suc);
// Mock.mock("http://localhost:8080/team/createTeam", "post", teamApi.create_team_fai);

Mock.mock("http://localhost:8080/team/createProject", "post", teamApi.create_project_suc);
// Mock.mock("http://localhost:8080/team/createProject", "post", teamApi.create_project_fai);

Mock.mock("http://localhost:8080/team/getContacts", "post", teamApi.get_contacts_suc);
// Mock.mock("http://localhost:8080/team/getContacts", "post", teamApi.get_contacts_fai);

Mock.mock("http://localhost:8080/team/searchUser", "post", teamApi.search_user_suc);
// Mock.mock("http://localhost:8080/team/searchUser", "post", teamApi.search_user_fai);addTeammates

Mock.mock("http://localhost:8080/team/addTeammates", "post", teamApi.add_teammates_suc);
// Mock.mock("http://localhost:8080/team/addTeammates", "post", teamApi.add_teammates_fai);

Mock.mock("http://localhost:8080/project/getResources", "post", projectApi.get_resources_suc);
// Mock.mock("http://localhost:8080/project/getResources", "post", projectApi.get_resources_fai);
