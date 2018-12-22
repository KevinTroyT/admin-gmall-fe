/**
 * @Author: troykevin
 * @Date:   2018-12-20T22:30:41+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T22:45:05+08:00
 */

 import React from 'react';
 import { Link } from 'react-router-dom';
 import PageTitle from 'component/page-title/index.jsx';

 class ErrorPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
    return(
    <div id="page-wrapper">
        <PageTitle title="出错了"/>
        <div className="row">
            <div className="col-md-12">
                <span>找不到该路径，</span>
                <Link to="/">点我返回首页</Link>
            </div>
        </div>
    </div>
    );
    }
 }

 export default ErrorPage
