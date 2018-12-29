/**
 * @Author: troykevin
 * @Date:   2018-12-26T19:10:52+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-27T00:32:12+08:00
 */
 import React from 'react';
 import Simditor from 'simditor';
 import 'simditor/styles/simditor.scss';
 import './index.scss';

 // 通用富文本编辑器 依赖jquery
 class RichEditor extends React.Component{
     constructor(props){
         super(props);
     }
     componentDidMount() {
         this.loadEditor();
     }
     componentWillReceiveProps(nextProps) {
         if(this.props.defaultDetail!== nextProps.defaultDetail){
              this.simditor.setValue(nextProps.defaultDetail);
         }
     }
     loadEditor(){
         let element = this.refs['textarea'];
         this.simditor = new Simditor({
             textarea : $(element),
             defaultValue : this.props.placeholder || '请输入内容',
             upload:{
                 url : '/manage/product/richtext_img_upload.do',
                 defaultImage : '',
                 fileKey : 'upload_file'
             }
         })
         this.bindEditorEvent();
     }
     bindEditorEvent(){
         // 初始化富文本编辑器事件
         this.simditor.on('valuechanged',e => {
             this.props.onValueChange(this.simditor.getValue());
         })
     }
     render(){
         return (
             <div className="rich-editor col-md-10">
                 <textarea ref="textarea"></textarea>
             </div>
         )
     }
 }
 export default RichEditor;
