/**
 * @Author: troykevin
 * @Date:   2018-12-20T01:33:00+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T13:59:06+08:00
 */
 import React from 'react';


 class PageTitle extends React.Component{
     constructor(props){
         super(props);
     }
     componentWillMount() {
         document.title = this. props.title + ' - GitMallAdmin';
     }
     render(){
         return (
             <div className="row">
                 <div className="col-md-12">
                      <h1 className="page-header">{this.props.title}</h1>
                      {this.props.children}
                 </div>
             </div>
         );
     }
 }

 export default PageTitle
