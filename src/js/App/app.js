//
//
import React, { Component } from 'react';
import './app.css';
import Header from '../components/Header/header';
import AppTabs from '../components/AppTabs/appTabs';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header/>
        <div className={'fry-nav-global'}>
          <div className={'fry-nav-global__bd'}>
            <AppTabs />
          </div>
        </div>
      </div>
    );
  }
}

export default App;