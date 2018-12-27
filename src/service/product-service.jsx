/**
 * @Author: troykevin
 * @Date:   2018-12-22T21:21:48+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-26T23:58:12+08:00
 */
 import GUtil    from 'util/gm.jsx'

 const _gm   = new GUtil();
 class Product{
     // 获取用户列表
     getProductList(listParam){
         let url = '',
             data = {};
         if (listParam.listType === 'list'){
             url = '/manage/product/list.do'
             data.pageNum = listParam.pageNum;
         }else if (listParam.listType === 'search'){
             url = '/manage/product/search.do'
             data.pageNum               = listParam.pageNum;
             data[listParam.searchType] = listParam.keyword;
         }
         return _gm.request({
             type : 'post',
             url  : url,
             data : data
         });
     }
     // 变更商品销售状态
     setProductStatus(productInfo){
         return _gm.request({
             type : 'post',
             url  : '/manage/product/set_sale_status.do',
             data : productInfo
         });
     }
     // 检查保存商品表单数据
     checkProduct(product){
         let result = {
             status : true,
             msg    : '通过'
         }
         if(typeof product.name != 'string' || product.name.length === 0){
             return {
                 status  : false,
                 msg     : '商品名不能为空'
             }
         }
         if(typeof product.subtitle != 'string' || product.subtitle.length === 0){
             return {
                 status  : false,
                 msg     : '描述不能为空'
             }
         }
         if(typeof product.categoryId != 'number' || !(product.price > 0)){
             return {
                 status  : false,
                 msg     : '请选择品类'
             }
         }
         if(typeof product.price != 'number' || !(product.price > 0)){
             return {
                 status  : false,
                 msg     : '价格错误'
             }
         }
         if(typeof product.stock != 'number' || !(product.stock > 0)){
             return {
                 status  : false,
                 msg     : '库存错误'
             }
         }


         return result
     }
     // 保存商品
     saveProduct(product){
         return _gm.request({
             type : 'post',
             url  : '/manage/product/save.do',
             data : product
         });
     }
     //获取商品详情
     getProduct(id){
         return _gm.request({
             type : 'post',
             url  : '/manage/product/detail.do',
             data : {
                 productId : id || 0    
             }
         });
     }





     //
     // 品类相关
     //
     getCategoryList(parentCategoryId){
         return _gm.request({
             type : 'post',
             url  : '/manage/category/get_category.do',
             data : {
                 categoryId : parentCategoryId || 0
             }
         });
     }

 }
 export default Product;
