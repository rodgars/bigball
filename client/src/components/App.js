import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Ranking from './Ranking';
import Payment from './Payment';
import GameRule from './GameRule';
import Landing from './Landing';
import Admin from './Admin';
import Mygame from './Mygame';


class App extends Component {

    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return (
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/ranking" component={Ranking} />
                        <Route exact path="/payment" component={Payment} />
                        <Route exact path="/rule" component={GameRule} />
                        <Route exact path="/admin" component={Admin} />
                        <Route exact path="/game" component={Mygame} />
                    </div>
                </BrowserRouter>
        );
    }
};

export default connect(null, actions)(App);