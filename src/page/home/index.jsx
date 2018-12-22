/**
 * @Author: troykevin
 * @Date:   2018-12-19T21:40:20+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T22:26:43+08:00
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss';
import User     from 'service/user-service.jsx'
import GUtil    from 'util/gm.jsx'

const _gm   = new GUtil();
const _user = new User();
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userCount : '-',
            productCount : '-',
            orderCount : '-'
        }
    }
    componentDidMount() {
        this.loadCount();
    }
    loadCount(){
        _user.loadCount().then(res =>  {
            this.setState(res);
        },errMsg => {
            _gm.errorTips(errMsg)
        })
    }
    render(){
    return(
    <div id="page-wrapper">
        <PageTitle title="首页"/>
        <div className="row">
            <div className="col-md-4">
                <Link to="/user" className="color-box red">
                    <p className="count">{this.state.userCount}</p>
                    <p className="desc">
                        <i className="fa fa-user-circle"></i>
                        <span>用户总数</span>
                    </p>
                </Link>
            </div>
            <div className="col-md-4">
                <Link to="/product" className="color-box brown">
                    <p className="count">{this.state.productCount}</p>
                    <p className="desc">
                        <i className="fa fa-list"></i>
                        <span>商品总数</span>
                    </p>
                </Link>
            </div>
            <div className="col-md-4">
                <Link to="/order" className="color-box blue">
                    <p className="count">{this.state.orderCount}</p>
                    <p className="desc">
                        <i className="fa fa-check-square"></i>
                        <span>订单总数</span>
                    </p>
                </Link>
            </div>
        </div>
    </div>
    );
    }
}

export default Home
