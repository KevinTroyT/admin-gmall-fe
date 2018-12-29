/**
 * @Author: troykevin
 * @Date:   2018-12-22T21:11:09+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-27T16:08:22+08:00
 */
 import React from 'react';
 import { BrowserRouter as Router ,Switch, Route, Link, Redirect} from 'react-router-dom'

 import ProductList from 'page/product/index/index.jsx';
 import ProductSave from 'page/product/index/save.jsx';
 import ProductDetail from 'page/product/index/detail.jsx';
 import CategoryList from 'page/product/category/index.jsx';
 import CategoryAdd from 'page/product/category/add.jsx';


 class ProductRouter extends React.Component{
     render(){
         return (
                 <Switch>
                    <Route exact path="/product/index" component={ProductList}/>
                    <Route path="/product/detail/:pid" component={ProductDetail}/>
                    <Route path="/product/save/:pid?" component={ProductSave}/>
                    <Route path="/product-category/index/:categoryId?" component={CategoryList}/>
                    <Route path="/product-category/add" component={CategoryAdd}/>
                    <Redirect exact from="/product" to="/product/index"/>
                    <Redirect exact from="/product-category" to="/product-category/index"/>
                 </Switch>
         );
     }
 }

export default ProductRouter
