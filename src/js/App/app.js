//
//
import React, { Component } from 'react';
import './app.css';
import Header from '../components/Header/header';
import AppTabs from '../components/AppTabs/appTabs';
import Disclaimer from '../components/Disclaimer/disclaimer';

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
        <Disclaimer />
      </div>
    );
  }
}

export default App;