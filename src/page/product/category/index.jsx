/**
 * @Author: troykevin
 * @Date:   2018-12-27T14:38:24+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-27T16:25:56+08:00
 */
 import React from 'react';
 import { Link } from 'react-router-dom';
 import PageTitle from 'component/page-title/index.jsx';
 import TableList from 'util/table-list/index.jsx';
 import Product     from 'service/product-service.jsx';
 import GUtil    from 'util/gm.jsx';

 const _gm   = new GUtil();
 const _product = new Product();
 class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list                 : [],
            parentCategoryId     : this.props.match.params.categoryId || 0
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            },() => {
                this.loadCategoryList();
            });
        }
    }
    loadCategoryList(){
        _product.getCategoryList(
            this.state.parentCategoryId
        ).then(res => {
            this.setState({
                list : res
            });
        },errMsg => {
            this.setState({
                list : []
            });
            _gm.errorTips(errMsg);
        });
    }
    onUpdateName(categoryId, categoryName){
        let newName = window.prompt('请输入新的分类名称',categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId : categoryId,
                categoryName : newName
            }).then(res => {
                _gm.successTips(res);
                this.loadCategoryList();
            },errMsg => {
                _gm.errorTips(errMsg);
            });
        }
    }
    render(){

        return(
            <div id="page-wrapper">
                <PageTitle title="分类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加分类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父分类ID:{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['分类id','分类名称','操作']}>
                    {
                        this.state.list.map((category,index) => {
                            return (
                                    <tr key={index}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <p><a className="opear" onClick={e => this.onUpdateName(category.id, category.name)}><i className="fa fa-chevron-circle-right"></i>修改名称</a></p>
                                            <p>{
                                                category.parentId === 0 ?
                                                <Link to={`/product-category/index/${category.id}`}><i className="fa fa-chevron-circle-right"></i>查看子品类</Link> : null
                                            }</p>
                                        </td>
                                    </tr>
                            );
                        })
                    }
                </TableList>
            </div>
        );
    }
 }

 export default CategoryList
