/**
 * @Author: troykevin
 * @Date:   2018-12-28T21:31:44+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-28T23:20:38+08:00
 */
 import React from 'react';


 class ListSearch extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             orderNumber  : ''
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
         this.props.onSearch(this.state.orderNumber);
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
                                 <option value="productId">按订单号查询</option>
                             </select>
                         </div>
                         <div className="form-group">
                             {
                                  <input type="number"
                                        className="form-control"
                                        name="orderNumber"
                                        onChange ={e=> this.onValueChange(e)}
                                        onKeyUp={e=>this.onSearchKeywordKeyUp(e)}
                                        placeholder="请输入订单号"
                                />
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
