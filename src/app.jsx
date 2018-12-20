/**
 * @Author: troykevin
 * @Date:   2018-12-17T11:45:32+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-12-20T01:26:32+08:00
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router ,Switch, Route, Link, Redirect} from 'react-router-dom'
import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';

class App extends React.Component{
    render(){
        return (
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/product" component={Home}/>
                            <Route exact path="/product.category" component={Home}/>
                        </Switch>
                    </Layout>
                </Router>
            // <Home />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
