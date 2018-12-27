/**
 * @Author: troykevin
 * @Date:   2018-12-22T21:25:33+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-24T15:28:55+08:00
 */
 import React from 'react';


 // 通用表格封装
 class TableList extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             isFirstLoad : true
         }
     }
     componentWillReceiveProps(nextProps) {
         // 第一次挂载后 改变状态为false
         this.setState({
             isFirstLoad : false
         })
     }
     render(){
         let tableHeader = this.props.tableHeads.map((tableHead,index) => {
             return <td key={index}>{tableHead}</td>
        })

         //列表内容
         let listBody = this.props.children;
         // 列表的信息
         let listError = (
                 <tr>
                     <td colSpan={this.props.tableHeads.length} align="center">{
                             this.state.isFirstLoad == true ? '正在加载数据中...' : '没有找到相应的结果'
                         }</td>
                 </tr>
         );
         let tableBody = listBody.length > 0 ? listBody : listError;
         return (
             <div className="row">
                 <div className="col-md-12">
                     <table className="table table-striped table-bordered">
                        <thead>
                            <tr>{tableHeader}</tr>
                        </thead>
                         <tbody>
                             {tableBody}
                         </tbody>
                     </table>
                 </div>
             </div>
         )
     }
 }
 export default TableList;
