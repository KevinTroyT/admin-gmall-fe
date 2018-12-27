/**
 * @Author: troykevin
 * @Date:   2018-12-22T21:15:18+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-24T20:47:10+08:00
 */

 import React from 'react';
 import { Link } from 'react-router-dom';
 import PageTitle from 'component/page-title/index.jsx';
 import TableList from 'util/table-list/index.jsx';
 import ListSearch from './index-list-search.jsx';
 import Pagination from 'util/pagination/index.jsx'
 import Product     from 'service/product-service.jsx'
 import GUtil    from 'util/gm.jsx'
 import './index.scss';

 const _gm   = new GUtil();
 const _product = new Product();
 class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list        : [],
            pageNum     : 1,
            listType    : 'list'
        }
    }
    componentDidMount() {
        this.loadProductList();
    }
    // 加载商品
    loadProductList(){
        let listParam ={};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 搜索
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        _product.getProductList(
            listParam
        ).then(res => {
            this.setState(res)
        },errMsg => {
            this.setState({
                list : []
            });
            _gm.errorTips(errMsg);
        });
    }
    onSearch(searchType,searchKeyword){
        //搜索
        let listType = searchKeyword === '' ? 'list' : 'search'
        this.setState({
            listType : listType,
            pageNum  : 1,
            searchType : searchType,
            searchKeyword : searchKeyword
        },() => {
            this.loadProductList();
        });
    }
    onPageNumChange(pageNum){
        // 页数改变
        this.setState({
            pageNum : pageNum
        },() => {
            this.loadProductList();
        })
    }
    // 改变商品状态
    onSetStauts(e, productId, currentStatus){
        let newStatus = currentStatus == 1 ? 2 : 1,
            confirmTips = currentStatus == 1 ? '确认要下架吗？' : '确认要上架吗？';
        if(window.confirm(confirmTips)){
            _product.setProductStatus({
                productId : productId,
                status : newStatus
            }).then(res=>{
                _gm.successTips(res);
                this.loadProductList()
            },err => {
                _gm.errorTips(res);
            });
        }

    }
    render(){
            return(
                <div id="page-wrapper">
                    <PageTitle title="商品列表">
                        <div className="page-header-right">
                            <Link to="/product/save" className="btn btn-primary">
                                <i className="fa fa-plus"></i>
                                <span>添加商品</span>
                            </Link>
                        </div>
                    </PageTitle>
                    <ListSearch  onSearch={(searchType, searchKeyWord) => {this.onSearch(searchType, searchKeyWord)}}/>
                    <TableList tableHeads={['商品ID','商品信息','价格','状态','操作']}>
                        {
                            this.state.list.map((product,index) => {
                                return (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>
                                                <p>{product.name}</p>
                                                <p>{product.subtitle}</p>
                                            </td>
                                            <td>¥{product.price}</td>
                                            <td>
                                                <span>{product.status == 1 ? '在售' : '已下架'}</span>
                                                <p><button className="btn btn-xs btn-warning" onClick={e => this.onSetStauts(e, product.id, product.status)}>{product.status == 1 ? '下架' : '上架'}</button></p>
                                            </td>
                                            <td>
                                                <Link to={`/product/detail/${product.id}`}><i className="fa fa-chevron-circle-right"></i>查看详情</Link>
                                                <p></p>
                                                <Link to={`/product/save/${product.id}`}><i className="fa fa-chevron-circle-right"></i>编辑</Link>
                                            </td>
                                        </tr>
                                );
                            })
                        }
                    </TableList>
                    <Pagination
                        current={this.state.pageNum}
                        total={this.state.total}
                        onChange={ pageNum => this.onPageNumChange(pageNum)
                    }/>
                </div>
            );
    }
 }

 export default ProductList
