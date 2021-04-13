import Mock from 'mockjs'
import loginApi from './login'
import infoApi from './profile'
import teamApi from './team'
import projectApi from './project'
import individualApi from './individual'
import messageApi from './message'

/**
 * Mock.mock( rurl, rtype, template )
 * rurl:请求的接口地址
 * rtype:提交方式
 * template:返回数据
 */ 

 Mock.mock("http://localhost:8080/login/loginIn", "post", loginApi.login_result_suc);
//  Mock.mock("http://localhost:8080/login/loginIn", "post", loginApi.login_result_fai);

 Mock.mock("http://localhost:8080/login/register", "post", loginApi.register_result_suc);
//  Mock.mock("http://localhost:8080/login/register", "post", loginApi.register_result_fai);

 Mock.mock("http://localhost:8080/login/forgetPassword", "post", loginApi.forget_result_suc);
//  Mock.mock("http://localhost:8080/login/forgetPassword", "post", loginApi.forget_result_fai);

Mock.mock("http://localhost:8080/profile/pswd", "post", infoApi.change_pswd_suc);
// Mock.mock("http://localhost:8080/profile/pswd", "post", infoApi.change_pswd_fai);

Mock.mock("http://localhost:8080/profile/info", "post", infoApi.change_info_suc);
// Mock.mock("http://localhost:8080/profile/info", "post", infoApi.change_info_fai);

Mock.mock("http://localhost:8080/profile/getNotifications", "post", infoApi.get_notifications_suc);
// Mock.mock("http://localhost:8080/profile/getNotifications", "post", infoApi.get_notifications_fai);

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

Mock.mock("http://localhost:8080/team/getTeammates", "post", teamApi.get_teammates_suc);
// Mock.mock("http://localhost:8080/team/getTeammates", "post", teamApi.get_teammates_fai);

Mock.mock("http://localhost:8080/project/getResources", "post", projectApi.get_resources_suc);
// Mock.mock("http://localhost:8080/project/getResources", "post", projectApi.get_resources_fai);

Mock.mock("http://localhost:8080/project/uploadResources", "post", projectApi.upload_resources_suc);
// Mock.mock("http://localhost:8080/project/uploadResources", "post", projectApi.upload_resources_fai);

Mock.mock("http://localhost:8080/project/assignTask", "post", projectApi.assign_task_suc);
// Mock.mock("http://localhost:8080/project/assignTask", "post", projectApi.assign_task_fai);

Mock.mock("http://localhost:8080/project/editProject", "post", projectApi.edit_project_suc);
// Mock.mock("http://localhost:8080/project/editProject", "post", projectApi.edit_project_fai);

Mock.mock("http://localhost:8080/project/deleteProject", "post", projectApi.delete_project_suc);
// Mock.mock("http://localhost:8080/project/deleteProject", "post", projectApi.delete_project_fai);

Mock.mock("http://localhost:8080/individual/getToDoOverview", "post", individualApi.get_todo_overview_suc);
// Mock.mock("http://localhost:8080/individual/getToDoOverview", "post", individualApi.get_todo_overview_fai);

Mock.mock("http://localhost:8080/individual/getToDoList", "post", individualApi.get_todo_list_suc);
// Mock.mock("http://localhost:8080/individual/getToDoList", "post", individualApi.get_todo_list_fai);

Mock.mock("http://localhost:8080/individual/getShorthands", "post", individualApi.get_shorthands_suc);
// Mock.mock("http://localhost:8080/individual/getShorthands", "post", individualApi.get_shorthands_fai);

Mock.mock("http://localhost:8080/individual/saveShorthand", "post", individualApi.save_shorthand_suc);
// Mock.mock("http://localhost:8080/individual/saveShorthand", "post", individualApi.save_shorthand_fai);

Mock.mock("http://localhost:8080/individual/getAshorthand", "post", individualApi.get_a_shorthand_suc);
// Mock.mock("http://localhost:8080/individual/getAshorthand", "post", individualApi.get_a_shorthand_fai);

Mock.mock("http://localhost:8080/individual/editShorthand", "post", individualApi.edit_shorthand_suc);
// Mock.mock("http://localhost:8080/individual/editShorthand", "post", individualApi.edit_shorthand_fai);

Mock.mock("http://localhost:8080/message/getPrivateChat", "post", messageApi.get_private_chat_suc);
// Mock.mock("http://localhost:8080/message/getPrivateChat", "post", messageApi.get_private_chat_fai);

Mock.mock("http://localhost:8080/message/getTeamChat", "post", messageApi.get_team_chat_suc);
// Mock.mock("http://localhost:8080/message/getTeamChat", "post", messageApi.get_team_chat_fai);

Mock.mock("http://localhost:8080/message/getMessageRecordById", "post", messageApi.get_message_record_suc);
// Mock.mock("http://localhost:8080/message/getMessageRecordById", "post", messageApi.get_message_record_fai);

Mock.mock("http://localhost:8080/message/sendMessage", "post", messageApi.send_message_suc);
// Mock.mock("http://localhost:8080/message/sendMessage", "post", messageApi.send_message_fai);
