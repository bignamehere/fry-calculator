// author: bignamehere
//
import React, { Component } from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import reducers from '../reducers';

import './app.css';
import Header from '../components/Header/header';
import Tabs from '../components/Tabs/tabs';
// Views
import Consultation from '../views/Consultation/consultation';
import Payment from '../views/Payment/payment';
import Savings from '../views/Savings/savings';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={Consultation}/>
            <Route path="/payment" component={Payment}/>
            <Route path="/savings" component={Savings}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;