/**
 * @Author: troykevin
 * @Date:   2018-12-20T14:08:56+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-23T02:20:51+08:00
 */
class GUtil{
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type || 'get',
                url         : param.url || '',
                dataTyoe    : param.dataType || 'json',
                data        : param.data || null ,
                success     : res => {
                    if(0 === res.status){
                        // 请求成功
                        typeof resolve==='function' && resolve(res.data, res.msg);
                    }else if (10 === res.status){
                        this.doLogin();
                    }else{
                        // 错误
                        typeof reject==='function' && reject(res.msg || res.data);
                    }
                },
                error       : err => {
                    typeof reject === 'function' && reject(err.statusText)
                }
            });
        });
    }
    // 跳转登录
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    getUrlParam(name){
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    successTips(res){
        $("#errAlert").removeClass('alert-danger');
        $("#errAlert").addClass('alert-success')
        $("#alertTitle").text("好消息!!");
        $(".errMsg").text(res || "您的操作成功");
        $("#errAlert").fadeIn('fast');
    }
    errorTips(errMsg){
        $("#errAlert").removeClass('alert-success');
        $("#errAlert").addClass('alert-danger')
        $("#alertTitle").text("发生了一个错误!!");
        $(".errMsg").text(errMsg || "哪里不对了");
        $("#errAlert").fadeIn('fast');
    }
    // 本地存储存取
    setStorage(name, data){
        let dataType = typeof data;
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }else{
            this.errorTips("本地存储出错，该类型不支持");
        }
    }
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data); // 基础类型也会经过处理
        }else{
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}
export default GUtil;
