/**
 * @Author: troykevin
 * @Date:   2018-12-22T21:11:09+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-27T14:32:39+08:00
 */
 import React from 'react';
 import { BrowserRouter as Router ,Switch, Route, Link, Redirect} from 'react-router-dom'

 import ProductList from 'page/product/index/index.jsx';
 import ProductSave from 'page/product/index/save.jsx';
 import ProductDetail from 'page/product/index/detail.jsx';



 class ProductRouter extends React.Component{
     render(){
         return (
                 <Switch>
                    <Route exact path="/product/index" component={ProductList}/>
                    <Route path="/product/detail/:pid" component={ProductDetail}/>
                    <Route path="/product/save/:pid?" component={ProductSave}/>
                    <Redirect exact from="/product" to="/product/index"/>
                 </Switch>
         );
     }
 }

export default ProductRouter
