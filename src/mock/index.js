import Mock from 'mockjs'
import userApi from './user'
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

 Mock.mock("http://localhost:8080/user/login", "post", userApi.login_result_suc);
//  Mock.mock("http://localhost:8080/user/login", "post", userApi.login_result_fai);

Mock.mock("http://localhost:8080/user/logout", "post", userApi.logout_result_suc);
//  Mock.mock("http://localhost:8080/user/logout", "post", userApi.logout_result_fai);

 Mock.mock("http://localhost:8080/user/register", "post", userApi.register_result_suc);
//  Mock.mock("http://localhost:8080/user/register", "post", userApi.register_result_fai);

 Mock.mock("http://localhost:8080/user/forgetPassword", "post", userApi.forget_result_suc);
//  Mock.mock("http://localhost:8080/user/forgetPassword", "post", userApi.forget_result_fai);

 Mock.mock("http://localhost:8080/user/verify", "post", userApi.get_verify_code_suc);
//  Mock.mock("http://localhost:8080/user/verify", "post", userApi.get_verify_code_fai);

Mock.mock("http://localhost:8080/profile/pswd", "post", infoApi.change_pswd_suc);
// Mock.mock("http://localhost:8080/profile/pswd", "post", infoApi.change_pswd_fai);

Mock.mock("http://localhost:8080/user/update", "post", infoApi.change_info_suc);
// Mock.mock("http://localhost:8080/user/update", "post", infoApi.change_info_fai);

Mock.mock("http://localhost:8080/profile/getNotifications", "post", infoApi.get_notifications_suc);
// Mock.mock("http://localhost:8080/profile/getNotifications", "post", infoApi.get_notifications_fai);

Mock.mock("http://localhost:8080/team/getTeams", "get", teamApi.get_teams_suc);
// Mock.mock("http://localhost:8080/team/getTeams", "get", teamApi.get_teams_fai);

Mock.mock("http://localhost:8080/team/getTeamInfo", "post", teamApi.get_team_info_suc);
// Mock.mock("http://localhost:8080/team/getTeamInfo", "post", teamApi.get_team_info_fai);

Mock.mock("http://localhost:8080/team/createTeam", "post", teamApi.create_team_suc);
// Mock.mock("http://localhost:8080/team/createTeam", "post", teamApi.create_team_fai);

Mock.mock("http://localhost:8080/team/searchTeams", "post", teamApi.get_teams_suc);
// Mock.mock("http://localhost:8080/team/searchTeams", "post", teamApi.get_teams_fai);

Mock.mock("http://localhost:8080/team/joinTeam", "post", teamApi.join_team_suc);
// Mock.mock("http://localhost:8080/team/joinTeam", "post", teamApi.join_team_fai);

Mock.mock("http://localhost:8080/team/createProject", "post", teamApi.create_project_suc);
// Mock.mock("http://localhost:8080/team/createProject", "post", teamApi.create_project_fai);

Mock.mock("http://localhost:8080/team/getContacts", "post", teamApi.get_contacts_suc);
// Mock.mock("http://localhost:8080/team/getContacts", "post", teamApi.get_contacts_fai);

Mock.mock("http://localhost:8080/team/searchUser", "post", teamApi.search_user_suc);
// Mock.mock("http://localhost:8080/team/searchUser", "post", teamApi.search_user_fai);

Mock.mock("http://localhost:8080/team/addMember", "post", teamApi.add_teammates_suc);
// Mock.mock("http://localhost:8080/team/addMember", "post", teamApi.add_teammates_fai);

Mock.mock("http://localhost:8080/team/getTeammates", "post", teamApi.get_teammates_suc);
// Mock.mock("http://localhost:8080/team/getTeammates", "post", teamApi.get_teammates_fai);

Mock.mock("http://localhost:8080/team/editTeam", "post", teamApi.edit_team_suc);
// Mock.mock("http://localhost:8080/team/editTeam", "post", teamApi.edit_team_fai);

Mock.mock("http://localhost:8080/team/transfer", "post", teamApi.transfer_team_suc);
// Mock.mock("http://localhost:8080/team/transfer", "post", teamApi.transfer_team_fai);

Mock.mock("http://localhost:8080/team/getAuthority", "post", teamApi.get_authority_suc);
// Mock.mock("http://localhost:8080/team/getAuthority", "post", teamApi.get_authority_fai);

Mock.mock("http://localhost:8080/team/editAuthority", "post", teamApi.edit_authority_suc);
// Mock.mock("http://localhost:8080/team/editAuthority", "post", teamApi.edit_authority_fai);

Mock.mock("http://localhost:8080/team/quit", "post", teamApi.quit_team_suc);
// Mock.mock("http://localhost:8080/team/quit", "post", teamApi.quit_team_fai);

Mock.mock("http://localhost:8080/project/getResources", "post", projectApi.get_resources_suc);
// Mock.mock("http://localhost:8080/project/getResources", "post", projectApi.get_resources_fai);

Mock.mock("http://localhost:8080/project/uploadResources", "post", projectApi.upload_resources_suc);
// Mock.mock("http://localhost:8080/project/uploadResources", "post", projectApi.upload_resources_fai);

Mock.mock("http://localhost:8080/project/getMyTasks", "post", projectApi.get_my_tasks_suc);
// Mock.mock("http://localhost:8080/project/getMyTasks", "post", projectApi.get_my_tasks_fai);

Mock.mock("http://localhost:8080/project/assignTask", "post", projectApi.assign_task_suc);
// Mock.mock("http://localhost:8080/project/assignTask", "post", projectApi.assign_task_fai);

Mock.mock("http://localhost:8080/project/finishTask", "post", projectApi.finish_task_suc);
// Mock.mock("http://localhost:8080/project/finishTask", "post", projectApi.finish_task_fai);

Mock.mock("http://localhost:8080/project/deleteMyTask", "post", projectApi.delete_my_task_suc);
// Mock.mock("http://localhost:8080/project/deleteMyTask", "post", projectApi.delete_my_task_fai);

Mock.mock("http://localhost:8080/project/getTasksOverview", "post", projectApi.get_tasks_overview_suc);
// Mock.mock("http://localhost:8080/project/getTasksOverview", "post", projectApi.get_tasks_overview_fai);

Mock.mock("http://localhost:8080/project/getTasksDetail", "post", projectApi.get_tasks_detail_suc);
// Mock.mock("http://localhost:8080/project/getTasksDetail", "post", projectApi.get_tasks_detail_fai);

Mock.mock("http://localhost:8080/project/getIndividualTasksDetail", "post", projectApi.get_idv_tasks_detail_suc);
// Mock.mock("http://localhost:8080/project/getIndividualTasksDetail", "post", projectApi.get_idv_tasks_detail_fai);

Mock.mock("http://localhost:8080/project/getTeamTasksDetail", "post", projectApi.get_team_tasks_detail_suc);
// Mock.mock("http://localhost:8080/project/getTeamTasksDetail", "post", projectApi.get_team_tasks_detail_fai);

Mock.mock("http://localhost:8080/project/getDynamics", "post", projectApi.get_dynamics_suc);
// Mock.mock("http://localhost:8080/project/getDynamics", "post", projectApi.get_dynamics_fai);

Mock.mock("http://localhost:8080/project/editProject", "post", projectApi.edit_project_suc);
// Mock.mock("http://localhost:8080/project/editProject", "post", projectApi.edit_project_fai);

Mock.mock("http://localhost:8080/project/deleteProject", "post", projectApi.delete_project_suc);
// Mock.mock("http://localhost:8080/project/deleteProject", "post", projectApi.delete_project_fai);

Mock.mock("http://localhost:8080/project/sendComment", "post", projectApi.delete_project_suc);
// Mock.mock("http://localhost:8080/project/sendComment", "post", projectApi.delete_project_fai);

Mock.mock("http://localhost:8080/project/sendReply", "post", projectApi.delete_project_suc);
// Mock.mock("http://localhost:8080/project/sendReply", "post", projectApi.delete_project_fai);

Mock.mock("http://localhost:8080/project/deleteComment", "post", projectApi.delete_project_suc);
// Mock.mock("http://localhost:8080/project/deleteComment", "post", projectApi.delete_project_fai);

Mock.mock("http://localhost:8080/project/getResourceDetail", "post", projectApi.get_resource_detail_suc);
// Mock.mock("http://localhost:8080/project/getResourceDetail", "post", projectApi.get_resource_detail_fai);

Mock.mock("http://localhost:8080/individual/getTodoOverview", "get", individualApi.get_todo_overview_suc);
// Mock.mock("http://localhost:8080/individual/getTodoOverview", "get", individualApi.get_todo_overview_fai);

Mock.mock("http://localhost:8080/individual/getTodoList", "post", individualApi.get_todo_list_suc);
// Mock.mock("http://localhost:8080/individual/getTodoList", "post", individualApi.get_todo_list_fai);

Mock.mock("http://localhost:8080/individual/addTodo", "post", individualApi.get_todo_list_suc);
// Mock.mock("http://localhost:8080/individual/addTodo", "post", individualApi.get_todo_list_fai);

Mock.mock("http://localhost:8080/individual/deleteTodo", "post", individualApi.get_todo_list_suc);
// Mock.mock("http://localhost:8080/individual/deleteTodo", "post", individualApi.get_todo_list_fai);

Mock.mock("http://localhost:8080/individual/getShorthands", "post", individualApi.get_shorthands_suc);
// Mock.mock("http://localhost:8080/individual/getShorthands", "post", individualApi.get_shorthands_fai);

Mock.mock("http://localhost:8080/individual/addShorthand", "post", individualApi.save_shorthand_suc);
// Mock.mock("http://localhost:8080/individual/addShorthand", "post", individualApi.save_shorthand_fai);

Mock.mock("http://localhost:8080/individual/deleteShorthand", "post", individualApi.save_shorthand_suc);
// Mock.mock("http://localhost:8080/individual/deleteShorthand", "post", individualApi.save_shorthand_fai);

Mock.mock("http://localhost:8080/individual/getAshorthand", "post", individualApi.get_a_shorthand_suc);
// Mock.mock("http://localhost:8080/individual/getAshorthand", "post", individualApi.get_a_shorthand_fai);

Mock.mock("http://localhost:8080/individual/editShorthand", "post", individualApi.edit_shorthand_suc);
// Mock.mock("http://localhost:8080/individual/editShorthand", "post", individualApi.edit_shorthand_fai);

Mock.mock("http://localhost:8080/individual/getContributions", "post", individualApi.get_contributions_suc);
// Mock.mock("http://localhost:8080/individual/getContributions", "post", individualApi.get_contributions_fai);

Mock.mock("http://localhost:8080/individual/getTaskByUrgent", "post", individualApi.get_task_urgent_suc);
// Mock.mock("http://localhost:8080/individual/getTaskByUrgent", "post", individualApi.get_task_urgent_fai);

Mock.mock("http://localhost:8080/individual/getTaskByTime", "post", individualApi.get_task_time_suc);
// Mock.mock("http://localhost:8080/individual/getTaskByTime", "post", individualApi.get_task_time_fai);

Mock.mock("http://localhost:8080/message/getPrivateChat", "post", messageApi.get_private_chat_suc);
// Mock.mock("http://localhost:8080/message/getPrivateChat", "post", messageApi.get_private_chat_fai);

Mock.mock("http://localhost:8080/message/getTeamChat", "post", messageApi.get_team_chat_suc);
// Mock.mock("http://localhost:8080/message/getTeamChat", "post", messageApi.get_team_chat_fai);

Mock.mock("http://localhost:8080/message/getMessageRecordById", "post", messageApi.get_message_record_suc);
// Mock.mock("http://localhost:8080/message/getMessageRecordById", "post", messageApi.get_message_record_fai);

Mock.mock("http://localhost:8080/message/sendMessage", "post", messageApi.send_message_suc);
// Mock.mock("http://localhost:8080/message/sendMessage", "post", messageApi.send_message_fai);
