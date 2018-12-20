/**
 * @Author: troykevin
 * @Date:   2018-12-20T00:04:30+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T01:03:34+08:00
 */
 import React from 'react';
 import { BrowserRouter, Link } from 'react-router-dom';
 class TopNav extends React.Component{
     constructor(props){
         super(props);
     }
     onLogout(){
         
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
                         <span>欢迎,admin </span>
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
