/**
 * @Author: troykevin
 * @Date:   2018-12-24T15:40:59+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-24T22:23:36+08:00
 */
 import React from 'react';


 class ListSearch extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             searchType     : 'productId' ,
             searchKeyword  : ''
         }
     }
     onValueChange(e){
         let name = e.target.name,
             value = e.target.value.trim();
         this.setState({
             [name] : value
         });
     }
     onSearch(e){
         this.props.onSearch(this.state.searchType,this.state.searchKeyword);
     }
     onSearchKeywordKeyUp(e){
         if(e.keyCode === 13){
            this.onSearch();
         }
     }
     render(){
         return (
             <div className="row search-wrap">
                 <div className="col-md-12">
                     <div className="form-inline">
                         <div className="form-group">
                             <select className="form-control" name="searchType" onChange ={e=> this.onValueChange(e)}>
                                 <option value="productId">按id查询</option>
                                 <option value="productName">按名称查询</option>
                             </select>
                         </div>
                         <div className="form-group">
                             {
                                 this.state.searchType === 'productId' ? (<input type="number"
                                        className="form-control"
                                        name="searchKeyword"
                                        onChange ={e=> this.onValueChange(e)}
                                        onKeyUp={e=>this.onSearchKeywordKeyUp(e)}
                                        placeholder="请输入"
                                />) : (<input type="text"
                                       className="form-control"
                                       name="searchKeyword"
                                       onChange ={e=> this.onValueChange(e)}
                                       onKeyUp={e=>this.onSearchKeywordKeyUp(e)}
                                       placeholder="请输入"
                               />)
                             }
                         </div>
                         <button className="btn btn-primary" onClick={e=>this.onSearch(e)}>搜索</button>
                     </div>
                 </div>
             </div>
         );
     }
 }

 export default ListSearch
