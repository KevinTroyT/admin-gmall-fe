/**
 * @Author: troykevin
 * @Date:   2018-12-20T16:06:46+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-22T19:31:49+08:00
 */
import GUtil    from 'util/gm.jsx'

const _gm   = new GUtil();
class User{
    // 用户登录
    login(loginInfo){
        return _gm.request({
            type : 'post',
            data : loginInfo,
            url: '/manage/user/login.do'
        })
    }
    // 退出登录
    logout(){
        return _gm.request({
            type : 'post',
            url: '/user/logout.do'
        })
    }
    // 获得统计数量
    loadCount(){
        return _gm.request({
            type : 'get',
            url : '/manage/statistic/base_count.do'
        })
    }
    getUserList(pageNum){
        return _gm.request({
            type : 'post',
            url  : '/manage/user/list.do',
            data : {
                pageNum : pageNum
            }
        })
    }
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        // 检查登录接口是否合法
        if(typeof username != 'string' || username.length === 0){
            return {
                status  : false,
                msg     : '用户名不能为空'
            }
        }
        if(typeof password != 'string' || password.length === 0){
            return {
                status  : false,
                msg     : '密码不能为空'
            }
        }
        return {
            status : true,
            msg    : '验证通过'
        }
    }
}
export default User;
