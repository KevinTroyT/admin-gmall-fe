/**
 * @Author: troykevin
 * @Date:   2018-12-28T21:34:20+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-29T13:36:33+08:00
 */
 import GUtil    from 'util/gm.jsx'

 const _gm   = new GUtil();
 class Order{
     // 获取商品列表
     getOrderList(listParam){
         let url = '',
             data = {};
         if (listParam.listType === 'list'){
             url = '/manage/order/list.do'
             data.pageNum = listParam.pageNum;
         }else if (listParam.listType === 'search'){
             url = '/manage/order/search.do'
             data.pageNum        = listParam.pageNum;
             data.orderNo        = listParam.orderNo;
         }
         return _gm.request({
             type : 'post',
             url  : url,
             data : data
         });
     }
     // 获取订单详情
     getOrderDetail(orderNumber){
         return _gm.request({
             type : 'post',
             url  : '/manage/order/detail.do',
             data : {
                 orderNo : orderNumber
             }
         })
     }
     sendGoods(orderNumber){
         return _gm.request({
             type : 'post',
             url  : '/manage/order/send_goods.do',
             data : {
                 orderNo : orderNumber
             }
         })
     }

 }
 export default Order;
