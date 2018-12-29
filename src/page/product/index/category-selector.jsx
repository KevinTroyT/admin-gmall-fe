/**
 * @Author: troykevin
 * @Date:   2018-12-24T22:30:53+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-27T14:29:46+08:00
 */
 import React from 'react';
 import './category-selector.scss'
 import Product     from 'service/product-service.jsx'
 import GUtil    from 'util/gm.jsx'

 const _gm   = new GUtil();
 const _product = new Product();
 class CategorySelector extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             firstCategoryList  : [],
             firstCategoryId    : 0,
             secondCategoryList : [],
             secondCategoryId   : 0
         }
     }
     componentDidMount() {
         this.loadFirstCategory();
     }
     componentWillReceiveProps(nextProps) {
         let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
             parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
         // 数据没有发生变化
         if(!categoryIdChange && !parentCategoryIdChange){
             return;
         }
         // 只有一级分类
         if(nextProps.parentCategoryId === 0){
             this.setState({
                 firstCategoryId : nextProps.categoryId,
                 secondCategoryId : 0
             });
         }else{
             this.setState({
                 firstCategoryId : nextProps.parentCategoryId,
                 secondCategoryId : nextProps.categoryId
             },()=>{
                 parentCategoryIdChange && this.loadSecondCategory();
             });
         }
     }
     // 加载一级分类
     loadFirstCategory(){
         _product.getCategoryList(this.state.firstCategoryId).then(res => {
             this.setState({
                 firstCategoryList : res
             });
         }, errMsg => {
             _gm.errorTips(errMsg);
         })
     }
     loadSecondCategory(){
         _product.getCategoryList(this.state.firstCategoryId).then(res => {
             this.setState({
                 secondCategoryList : res
             });
         }, errMsg => {
             _gm.errTips(errMsg);
         })
     }
     // 选择一级分类
     onFirstCategoryChange(e){
         if(this.props.readOnly){
             return;
         }
         let newValue = e.target.value || 0;
         this.setState({
             firstCategoryId    : newValue,
             secondCategoryId   : 0,
             secondCategoryList : []
         },() => {
             // 更新二级分类
             this.loadSecondCategory();
             this.onPropsCategoryChange();
         });
     }
     // 选择二级分类
     onSecondCategoryChange(e){
         if(this.props.readOnly){
             return;
         }
         let newValue = e.target.value || 0;
         this.setState({
             secondCategoryId    : newValue
         },() => {
             // 更新二级分类
             this.loadSecondCategory();
             this.onPropsCategoryChange();
         });
     }
     // 传给父组件
     onPropsCategoryChange(){
         let categoryChangeAble = typeof this.props.onCategoryChange === 'function';

         if(this.state.secondCategoryId){
             categoryChangeAble && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
         }else{
             // 如果没有二级分类
             categoryChangeAble && this.props.onCategoryChange(this.state.firstCategoryId, 0);
         }
     }
     render(){
         return (
             <div className="col-md-10">
               <select onChange={e=>this.onFirstCategoryChange(e)} className="form-control cate-select" value={this.state.firstCategoryId} readOnly={this.props.readOnly}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map(
                            (category, index) =>  <option value={category.id} key={index}> {category.name} </option>
                        )
                    }
               </select>
               {this.state.secondCategoryList.length ?
               <select onChange={e=>this.onSecondCategoryChange(e)} className="form-control cate-select" value={this.state.secondCategoryId} readOnly={this.props.readOnly}>
                   <option value="">请选择二级分类</option>
                   {
                       this.state.secondCategoryList.map(
                           (category, index) =>  <option value={category.id} key={index}> {category.name} </option>
                       )
                   }
               </select> : null
               }
             </div>
         );
     }
 }

export default CategorySelector
