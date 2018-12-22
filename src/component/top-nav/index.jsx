/**
 * @Author: troykevin
 * @Date:   2018-12-20T00:04:30+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T22:13:43+08:00
 */
 import React from 'react';
 import { BrowserRouter, Link } from 'react-router-dom';
 import User     from 'service/user-service.jsx'
 import GUtil    from 'util/gm.jsx'

 const _gm   = new GUtil();
 const _user = new User();
 class TopNav extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             username : _gm.getStorage('userInfo').username || ''
         }
     }
     onLogout(){
         // TODO: 退出登录
         _user.logout().then(res => {
             _gm.removeStorage('userInfo');
             window.location.href='/login'
         },errMsg => {
             _gm.errorTips(errMsg);
         })
     }
     render(){
         return (
             <div className="navbar navbar-default top-navbar" >
             <div className="navbar-header">
                 <Link className="navbar-brand" to="/"><b>GITMALL</b>ADMIN</Link>
             </div>

             <ul className="nav navbar-top-links navbar-right">
                 <li className="dropdown">
                     <a className="dropdown-toggle" href="javascript:;">
                         <i className="fa fa-user fa-fw"></i>
                     <span>欢迎 「{this.state.username}」 </span>
                         <i className="fa fa-caret-down"></i>
                     </a>
                     <ul className="dropdown-menu dropdown-user">
                         <li>
                             <a href="#" onClick={() => {this.onLogout()}}>
                                <i className="fa fa-sign-out fa-fw"></i>
                                <span>退出登录</span>
                            </a>
                         </li>
                     </ul>
                 </li>
             </ul>
         </div>
         );
     }
 }

 export default TopNav
