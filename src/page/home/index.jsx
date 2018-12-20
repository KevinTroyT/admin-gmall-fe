/**
 * @Author: troykevin
 * @Date:   2018-12-19T21:40:20+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T13:59:23+08:00
 */
import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

class Home extends React.Component{
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-12">
                        body
                    </div>
                </div>
            </div>
        );
    }
}

export default Home
