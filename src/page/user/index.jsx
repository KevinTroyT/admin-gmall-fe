/**
 * @Author: troykevin
 * @Date:   2018-12-20T23:18:11+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-22T19:30:36+08:00
 */
 import React from 'react';
 import { Link } from 'react-router-dom';
 import PageTitle from 'component/page-title/index.jsx';
 import Pagination from 'util/pagination/index.jsx'
 import User     from 'service/user-service.jsx'
 import GUtil    from 'util/gm.jsx'

 const _gm   = new GUtil();
 const _user = new User();
 class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list        : [],
            pageNum     : 1,
            firstLoad   : true
        }
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList(){
        _user.getUserList(
            this.state.pageNum
        ).then(res => {
            this.setState(res, () => {
                this.setState({
                    firstLoad : false
                })
            });
        },errMsg => {
            _gm.errorTips(errMsg);
        });
    }
    onPageNumChange(pageNum){
        // 页数改变
        this.setState({
            pageNum : pageNum
        },() => {
            this.loadUserList();
        })
    }
    render(){
        let listBody = this.state.list.map((user,index) => {
            return (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{new Date(user.createTime).toLocaleString()}</td>
                    </tr>
            );
        });
        let listError = (
                <tr>
                    <td colSpan="5" align="center">{
                            this.state.firstLoad ? '正在加载数据中...' : '没有找到相应的结果'
                        }</td>
                </tr>
        );
        let tableBody = this.state.list.length > 0 ? listBody : listError;


    return(
        <div id="page-wrapper">
            <PageTitle title="用户管理"/>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th>邮箱</th>
                                <th>电话</th>
                                <th>注册时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    onChange={ pageNum => this.onPageNumChange(pageNum)
                }/>
            </div>
        </div>
    );
    }
 }

 export default UserList
