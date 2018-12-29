/**
 * @Author: troykevin
 * @Date:   2018-12-29T12:48:29+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-29T13:36:52+08:00
 */
 import React from 'react';
 import PageTitle from 'component/page-title/index.jsx';
 import TableList from 'util/table-list/index.jsx';
 import Order     from 'service/order-service.jsx';
 import GUtil    from 'util/gm.jsx';
 import './detail.scss';

 const _gm   = new GUtil();
 const _order = new Order();


 class OrderDetail extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             orderNumber   : this.props.match.params.orderNumber,
             orderInfo     : {}
         }
     }
     componentDidMount() {
         this.loadOrderDetail();
     }
     loadOrderDetail(){
         _order.getOrderDetail(this.state.orderNumber).then(res=>{
            this.setState({
                orderInfo : res
            });
         }, errMsg=>{
             _gm.errorTips(errMsg);
         })
     }
     onSendClick(e){
         if(window.confirm('确认已经发货了吗？')){
             _order.sendGoods(this.state.orderNumber).then(
                 res=>{
                     _gm.successTips("发货成功");
                     this.loadOrderDetail;
                 },errMsg=>{
                     _gm.errorTips(errMsg);
                 }
             );
         }
         _order.send
     }
     render(){
         let receiverInfo = this.state.orderInfo.shippingVo || {},
             productList = this.state.orderInfo.orderItemVoList || [];
         return (
             <div id="page-wrapper">
                 <PageTitle title="订单详情" />
                 <div className="form-horizontal">
                       <div className="form-group">
                         <label className="col-md-2 control-label">订单号</label>
                         <div className="col-md-5">
                             <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">创建时间</label>
                         <div className="col-md-5">
                             <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">收件人信息</label>
                         <div className="col-md-5">
                             <p className="form-control-static">
                                 <strong>{receiverInfo.receiverName}，</strong>
                                 {receiverInfo.receiverProvince}
                                 {receiverInfo.receiverCity}
                                 {receiverInfo.receiverAddress}
                                 {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                             </p>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">订单状态</label>
                         <div className="col-md-5">
                             <p className="form-control-static">{this.state.orderInfo.statusDesc}
                                 {
                                     this.state.orderInfo.status == 20
                                     ? <button className="btn btn-success btn-sm btn-send" onClick={e=>this.onSendClick(e)}>立即发货</button> : null
                                 }
                             </p>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">支付方式</label>
                         <div className="col-md-5">
                             <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">订单金额</label>
                         <div className="col-md-5">
                             <p className="form-control-static">¥{this.state.orderInfo.payment}</p>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">商品列表</label>
                         <div className="col-md-10">
                             <p className="form-control-static">
                                 <TableList tableHeads={['商品图片','商品信息','单价','数量','合计']}>
                                     {
                                         productList.map((product,index) => {
                                             return (
                                                     <tr key={index}>
                                                         <td>
                                                             <img src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt={product.productName} className="p-img" />
                                                         </td>
                                                         <td>{product.productName}</td>
                                                         <td>¥{product.currentUnitPrice}</td>
                                                         <td>{product.quantity}</td>
                                                         <td>{product.totalPrice}</td>
                                                     </tr>
                                             );
                                         })
                                     }
                                 </TableList>
                             </p>
                         </div>
                       </div>
                   </div>
             </div>
          );
      }
  }

 export default OrderDetail
