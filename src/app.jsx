/**
 * @Author: troykevin
 * @Date:   2018-12-17T11:45:32+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-21T13:35:50+08:00
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router ,Switch, Route, Link, Redirect} from 'react-router-dom'
import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import UserList from 'page/user/index.jsx';


class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/product" component={Home}/>
                    <Route exact path="/product-category" component={Home}/>
                        <Route exact path="/user/index" component={UserList}/>
                <Redirect exact from="/user" to="/user/index" />
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
