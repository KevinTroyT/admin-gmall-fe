/**
 * @Author: troykevin
 * @Date:   2018-12-25T17:52:36+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-26T01:21:55+08:00
 */

import React from 'react';
import FileUpload from './FileUpload.jsx';

class FileUploader extends React.Component{
    render(){
        const options = {
            baseUrl             : '/manage/product/upload.do',
            fileFieldName       : 'upload_file',
            dataType            : 'json',
            chooseAndUpload     : true,
            uploadSuccess       : (res) => {this.props.onSuccess(res.data);},
            uploadError         :  (err) => {this.props.onError(err.message || '上传失败');}
        }
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload" className="btn btn-success btn-xs">请选择图片</button>
            </FileUpload>
        )
    }
}
export default FileUploader
