import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FryKnob from './js/components/knob';

const API_URL = 'http://localhost:3000/api/data.json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      appData: {},
    };
  }
  
  setAppData(data){
    this.setState({ appData: data });
    this.refs.dpKnob.onDataLoad();
    this.refs.mpKnob.onDataLoad();
  }

  componentWillMount(){
    fetch(API_URL)
      .then(response => response.json())
      .then( data => this.setAppData(data) )
      .catch(function(error) {
        console.log(error);
      });  
  }

  render() {
    const { appData } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Testing out a control</h1>
        <p>Select your down payment:</p>
        <div>
          <FryKnob ref="dpKnob" settings={ appData.DownPaymentKnobSettings } />
        </div>
        <p>Select your monthly payment:</p>
        <div>
          <FryKnob ref="mpKnob" settings={ appData.MonthlyKnobSettings } />
        </div>
      </div>
    );
  }
}

export default App;
