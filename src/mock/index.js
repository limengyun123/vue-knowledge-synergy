import Mock from 'mockjs'
import {login_result_suc,register_result_suc,forget_result_suc} from './user'

/**
 * Mock.mock( rurl, rtype, template )
 * rurl:请求的接口地址
 * rtype:提交方式
 * template:返回数据
 */ 

 Mock.mock("http://localhost:8080/user/login", "post", login_result_suc);
 Mock.mock("http://localhost:8080/user/register", "post", register_result_suc);
 Mock.mock("http://localhost:8080/user/forget", "post", forget_result_suc);