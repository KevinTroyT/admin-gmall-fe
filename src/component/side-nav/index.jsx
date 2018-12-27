/**
 * @Author: troykevin
 * @Date:   2018-12-20T00:04:26+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T22:16:12+08:00
 */
 import React from 'react';
 import { Link, NavLink } from 'react-router-dom';

 class SideNav extends React.Component{
     constructor(props){
         super(props);
     }
     render(){
         return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-home"></i>
                                <span>首页</span>
                        </NavLink>
                        </li>
                        <li className="">
                            <Link to="/product">
                                <i className="fa fa-list"></i>
                                商品
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                     <NavLink activeClassName="active-menu" to="/product">商品管理</NavLink>
                                </li>
                                <li>
                                     <NavLink to="/product-category" activeClassName="active-menu">分类管理</NavLink>
                                </li>
                            </ul>
                         </li>
                         <li className="">
                             <NavLink to="/order">
                                 <i className="fa fa-check-square"></i>
                                 订单
                                 <span className="fa arrow"></span>
                             </NavLink>
                             <ul className="nav nav-second-level collapse in">
                                 <li>
                                     <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
                                 </li>
                             </ul>
                         </li>
                         <li className="">
                             <NavLink to="/user">
                                <i className="fa fa-user-circle"></i>
                                用户
                                <span className="fa arrow"></span>
                            </NavLink>
                             <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
                                </li>
                             </ul>
                          </li>’
                     </ul>
                 </div>
             </div>
         );
     }
 }

 export default SideNav
