/**
 * @Author: troykevin
 * @Date:   2018-12-28T21:16:03+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-28T23:25:54+08:00
 */

  import React from 'react';
  import { Link } from 'react-router-dom';
  import PageTitle from 'component/page-title/index.jsx';
  import TableList from 'util/table-list/index.jsx';
  import ListSearch from './index-list-search.jsx';
  import Pagination from 'util/pagination/index.jsx'
  import Order     from 'service/order-service.jsx'
  import GUtil    from 'util/gm.jsx'

  const _gm   = new GUtil();
  const _order = new Order();
  class OrderList extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             list         : [],
             pageNum      : 1,
             listType     : 'list',
             orderNumber : ''
         }
     }
     componentDidMount() {
         this.loadOrderList();
     }
     // 加载商品
     loadOrderList(){
         let listParam ={};
         listParam.listType = this.state.listType;
         listParam.pageNum = this.state.pageNum;
         // 搜索
         if(this.state.listType === 'search'){
             listParam.orderNo = this.state.orderNumber;
         }
         _order.getOrderList(
             listParam
         ).then(res => {
             this.setState(res)
         },errMsg => {
             this.setState({
                 list : []
             });
             _gm.errorTips(errMsg);
         });
     }
     onSearch(orderNumber){
         //搜索
         let listType = orderNumber === '' ? 'list' : 'search'
         this.setState({
             listType       : listType,
             pageNum        : 1,
             orderNumber    : orderNumber
         },() => {
             this.loadOrderList();
         });
     }
     onPageNumChange(pageNum){
         // 页数改变
         this.setState({
             pageNum : pageNum
         },() => {
             this.loadOrderList();
         })
     }
     render(){
             return(
                 <div id="page-wrapper">
                     <PageTitle title="订单列表"/>
                     <ListSearch  onSearch={(orderNumber) => {this.onSearch(orderNumber)}}/>
                     <TableList tableHeads={['订单号','收件人','订单状态','订单总价','创建时间','操作']}>
                         {
                             this.state.list.map((order,index) => {
                                 return (
                                         <tr key={index}>
                                             <td>
                                                 <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                                             </td>
                                             <td>{order.receiverName}</td>
                                             <td>{order.statusDesc}</td>
                                             <td>¥{order.payment}</td>
                                             <td>{order.createTime}</td>
                                             <td>
                                                 <Link to={`/order/detail/${order.orderNo}`}><i className="fa fa-chevron-circle-right"></i>查看详情</Link>
                                             </td>
                                         </tr>
                                 );
                             })
                         }
                     </TableList>
                     <Pagination
                         current={this.state.pageNum}
                         total={this.state.total}
                         onChange={ pageNum => this.onPageNumChange(pageNum)
                     }/>
                 </div>
             );
     }
  }

  export default OrderList
