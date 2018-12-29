/**
 * @Author: troykevin
 * @Date:   2018-12-21T13:41:41+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-22T21:14:02+08:00
 */
import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css'


// 分页组件的封装
class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <RcPagination {...this.props} hideOnSinglePage showQuickJumper/>
                </div>
            </div>
        )
    }
}
export default Pagination;
