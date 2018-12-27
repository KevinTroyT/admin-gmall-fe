/**
 * @Author: troykevin
 * @Date:   2018-12-27T15:51:31+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-27T16:26:25+08:00
 */
 import React from 'react';
 import PageTitle from 'component/page-title/index.jsx';
 import Product     from 'service/product-service.jsx';
 import GUtil    from 'util/gm.jsx';

 const _gm   = new GUtil();
 const _product = new Product();
 class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList         : [],
            parentId             : 0,
            categoryName         : ''
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    onValueChange(e){
        // 简单字段的改变
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    loadCategoryList(){
        _product.getCategoryList(
            this.state.parentCategoryId
        ).then(res => {
            this.setState({
                categoryList : res
            });
        },errMsg => {
            _gm.errorTips(errMsg);
        });
    }
    onSubmit(){
        let categoryName = this.state.categoryName.trim();
        if(categoryName){
            _product.addCategory({
                parentId : this.state.parentId,
                categoryName : categoryName
            }).then(res=>{
                _gm.successTips(res);
                this.props.history.push('/product-category/index');
            },errMsg=>{
                _gm.errorTips(errMsg);
            })
        }else{
            _gm.errotTips("请输入正确的分类名称");
        }
    }
    render(){

        return(
            <div id="page-wrapper">
                <PageTitle title="添加分类"/>
                <div className="row">
                    <div className="form-horizontal">
                        <div className="col-md-12">
                            <div className="form-group">
                                  <label  className="col-md-2 control-label">所属品类</label>
                                  <div className="col-md-5">
                                  <select name="parentId" className="form-control" onChange={
                                          (e)=> this.onValueChange(e)
                                      }>
                                      <option value="0">根分类</option>
                                      {
                                          this.state.categoryList.map((category, index)=>{
                                             return <option key={index} value={category.id}>根分类/{category.name}</option>
                                          })
                                      }
                                  </select>
                                  </div>
                           </div>
                           <div className="form-group">
                             <label className="col-md-2 control-label">分类名称</label>
                             <div className="col-md-5">
                                 <input type="text" className="form-control"
                                      name="categoryName"
                                      value={this.state.name}
                                      onChange={e=>this.onValueChange(e)}
                                      placeholder="请输入分类名称"
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
                </div>
            </div>
        );
    }
 }

 export default CategoryAdd
