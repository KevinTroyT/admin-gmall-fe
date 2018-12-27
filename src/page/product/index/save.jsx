/**
 * @Author: troykevin
 * @Date:   2018-12-24T17:36:23+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-27T00:34:24+08:00
 */

import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss'
import Product     from 'service/product-service.jsx';
import GUtil    from 'util/gm.jsx';

const _gm   = new GUtil();
const _product = new Product();


class ProductSave extends React.Component{
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
                res.defaultDetail = res.detail;
                this.setState(res);
            }, errMsg=>{
                _gm.errorTips(errMsg);
            })
        }
    }
    onValueChange(e){
        // 简单字段的改变
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId : categoryId,
            parentCategoryId : parentCategoryId
        });
    }
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages
        });
    }
    onUploadError(errMsg){
        _gm.errorTips(errMsg)
    }
    onImageDelete(e){
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index,1);
        this.setState({
            subImages : subImages
        });
    }
    subImagesToString(){
        return this.state.subImages.map((image) => image.uri).join(',');
    }
    onDetailValueChange(value){
        this.setState({
            detail : value
        });
    }
    // 提交表单
    onSubmit(){
        let product = {
            id          : this.props.match.params.pid,
            name        : this.state.name,
            subtitle    : this.state.subtitle,
            categoryId  : parseInt(this.state.categoryId),
            subImages   : this.subImagesToString(),
            detail      : this.state.detail,
            price       : parseInt(this.state.price),
            stock       : parseInt(this.state.stock),
            status      : this.state.status
        }
        let productCheckResult = _product.checkProduct(product);
        if(this.state.id){
            product.id = this.state.id;
        }
        if(productCheckResult.status){
            _product.saveProduct(product).then(res=>{
                _gm.successTips(res);
                this.props.history.push('/product/index');
            }, errMsg=>{
                _gm.errorTips(errMsg);
            })
        }else{
            _gm.errorTips(productCheckResult.msg);
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />
            <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-md-2 control-label">商品名称</label>
                <div className="col-md-5">
                      <input type="text" className="form-control"
                             name="name"
                             value={this.state.name}
                             onChange={e=>this.onValueChange(e)}
                             placeholder="请输入商品名称" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">商品描述</label>
                    <div className="col-md-5">
                      <input type="text" className="form-control"
                             name="subtitle"
                             value={this.state.subtitle}
                             onChange={e=>this.onValueChange(e)}
                             placeholder="请输入商品描述" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">所属分类</label>
                    <CategorySelector
                        categoryId={this.state.categoryId}
                        parentCategoryId={this.state.parentCategoryId}
                        onCategoryChange={(categoryId,parentCategoryId) => this.onCategoryChange(categoryId,parentCategoryId)}
                    />
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">商品价格</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input  type="number" className="form-control"
                                    name="price"
                                    value={this.state.price}
                                    onChange={e=>this.onValueChange(e)}
                                    placeholder="请输入商品价格" />
                            <div className="input-group-addon">元</div>
                       </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">商品库存</label>
                    <div className="col-md-3">
                        <div className="input-group">
                            <input type="number" className="form-control"
                                    name="stock"
                                    value={this.state.stock}
                                    onChange={e=>this.onValueChange(e)}
                                    placeholder="请输入商品库存" />
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
                                        <i className="fa fa-close" index={index} onClick={e=>this.onImageDelete(e)}></i>
                                    </div>
                                )
                            ) : (<div>请上传图片</div>)
                        }
                    </div>
                    <div className="col-md-10 col-md-offset-2">
                        <FileUploader onSuccess={res => {this.onUploadSuccess(res)}} onError={(errMsg => this.onUploadError(errMsg))} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-md-2 control-label">商品详情</label>
                    <div className="col-md-10">
                        <RichEditor
                            detail={this.state.detail}
                            defaultDetail={this.state.defaultDetail}
                            onValueChange={value => this.onDetailValueChange(value)}
                        />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-offset-2 col-md-5">
                      <button type="submit" className="btn btn-primary" onClick={e=>this.onSubmit(e)}>提交</button>
                    </div>
                  </div>
              </div>
            </div>
         );
     }
 }

export default ProductSave
