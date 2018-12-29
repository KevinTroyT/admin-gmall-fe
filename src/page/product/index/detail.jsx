/**
 * @Author: troykevin
 * @Date:   2018-12-27T00:37:56+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-27T14:41:54+08:00
 */
 import React from 'react';
 import PageTitle from 'component/page-title/index.jsx';
 import CategorySelector from './category-selector.jsx';
 import './save.scss'
 import Product     from 'service/product-service.jsx';
 import GUtil    from 'util/gm.jsx';

 const _gm   = new GUtil();
 const _product = new Product();


 class ProductDetail extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             id   : this.props.match.params.pid,
             name : '',
             subtitle : '',
             categoryId : 0,
             parentCategoryId : 0,
             subImages       : [],
             price  : '',
             stock : '',
             detail : '',
             status : 1 // 在售
         }
     }
     componentDidMount() {
         this.loadProduct();
     }
     loadProduct(){
         if(this.state.id){
             // 有id则为编辑功能，处理表单回填
             _product.getProduct(this.state.id).then(res=>{
                 let images = res.subImages.split(',');
                 res.subImages = images.map(imgUri=>{
                     return{
                         uri : imgUri,
                         url : res.imageHost + imgUri
                     }
                 });
                 this.setState(res);
             }, errMsg=>{
                 _gm.errorTips(errMsg);
             })
         }
     }
     render(){
         return (
             <div id="page-wrapper">
                 <PageTitle title="商品详情" />
                 <div className="form-horizontal">
                       <div className="form-group">
                         <label className="col-md-2 control-label">商品名称</label>
                         <div className="col-md-5">
                             <p className="form-control-static">{this.state.name}</p>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">商品描述</label>
                         <div className="col-md-5">
                             <p className="form-control-static">{this.state.subtitle}</p>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">所属分类</label>
                         <CategorySelector
                             readOnly
                             categoryId={this.state.categoryId}
                             parentCategoryId={this.state.parentCategoryId}
                         />
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">商品价格</label>
                         <div className="col-md-3">
                             <div className="input-group">
                                 <input  type="number" className="form-control"
                                         value={this.state.price}
                                         readOnly
                                 />
                                 <div className="input-group-addon">元</div>
                            </div>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">商品库存</label>
                         <div className="col-md-3">
                             <div className="input-group">
                                 <input type="number" className="form-control"
                                         value={this.state.stock}
                                         readOnly
                                 />
                                 <div className="input-group-addon">件</div>
                             </div>
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">商品图片</label>
                         <div className="col-md-10">
                             {
                                 this.state.subImages.length ? this.state.subImages.map(
                                     (image,index) => (
                                         <div className="img-con" key={index}>
                                             <img src={image.url} />
                                         </div>
                                     )
                                 ) : (<div>暂无图片</div>)
                             }
                         </div>
                       </div>
                       <div className="form-group">
                         <label  className="col-md-2 control-label">商品详情</label>
                         <div className="col-md-10">
                                <div dangerouslySetInnerHTML={{__html : this.state.detail}}>

                                </div>
                         </div>
                       </div>
                   </div>
             </div>
          );
      }
  }

 export default ProductDetail
