/**
 * @Author: troykevin
 * @Date:   2018-12-19T22:39:58+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-26T22:13:56+08:00
 */
import React from 'react';
import './theme.css';
import './index.scss';
import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';

class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                <div id="wrapper">
                    <TopNav />
                    <SideNav />
                    {this.props.children}
                </div>
        );
    }
}

export default Layout
