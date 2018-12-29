/**
 * @Author: troykevin
 * @Date:   2018-12-20T14:13:25+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T19:08:41+08:00
 */
import React    from 'react';
import User     from 'service/user-service.jsx'
import GUtil    from 'util/gm.jsx'

const _gm   = new GUtil();
const _user = new User();
import './index.scss';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            redirect : _gm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount() {
        document.title = "登录 - GitMallAdmin"
    }
    onInputChange(e){
        // 当input框发生改变
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    onInputKeyup(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    onSubmit(e){
        // 提交表单
        let loginInfo = {
            username : this.state.username,
            password : this.state.password
        },
            checkResult = _user.checkLoginInfo(loginInfo);
        if(checkResult.status){
            _user.login(loginInfo).then((res) => {
                _gm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            },(errMsg) => {
                _gm.errorTips(errMsg);
            })
        }else{
            _gm.errorTips(checkResult.msg);
        }
    }
    render(){
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-primary login-panel">
                    <div className="panel-heading">欢迎登录 - GitMall管理系统</div>
                    <div className="panel-body">
                        <div>
                          <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="User"
                            placeholder="请输入用户名"
                            onKeyUp={e => this.onInputKeyup(e)}
                            onChange={e => this.onInputChange(e)}
                        />
                          </div>
                          <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="PassWd"
                            onKeyUp={e => this.onInputKeyup(e)}
                            placeholder="请输入密码"
                            onChange={e => this.onInputChange(e)}
                        />
                          </div>
                              <button
                                  className="btn btn-primary btn-lg btn-block"
                                  onClick={e => this.onSubmit()}
                                  >
                                      登录
                              </button>
                          </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login
