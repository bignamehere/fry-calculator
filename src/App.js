import React, { Component } from 'react';
import logo from './img/fry_website_footerlogo2016.png';
import './App.css';
import './styles/fry-style.scss';
import DisplayTotals from './js/components/DisplayTotals';
import FryKnob from './js/components/Knob';

const API_URL = 'http://localhost:3000/api/data.json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      appData: {}
    };
    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
    this.onMonthlyPaymentsChange = this.onMonthlyPaymentsChange.bind(this);
    this.onMonthsChange = this.onMonthsChange.bind(this);
    this.onCostTotalChange = this.onCostTotalChange.bind(this);
    this.recalculateTotals = this.recalculateTotals.bind(this);
  }
  
  initAppData(data){

    this.setState({ appData: data });
    
    let dp = this.state.appData.DownPaymentKnobSettings.initial_value;
    let mp = this.state.appData.MonthlyPaymentsKnobSettings.initial_value;
    let m = this.state.appData.MonthsKnobSettings.initial_value;
    let maxPayments = this.state.appData.MonthlyPaymentsKnobSettings.value_max;
    let maxMonths = this.state.appData.MonthsKnobSettings.value_max;
		let maxTotal = this.state.appData.DownPaymentKnobSettings.value_max;

		let dpKnobRoundNumber = this.state.appData.DownPaymentKnobSettings.roundNumber;
		let mpKnobRoundNumber = this.state.appData.MonthlyPaymentsKnobSettings.roundNumber;
		let mKnobRoundNumber = this.state.appData.MonthsKnobSettings.roundNumber;

    this.setState({
      downpayment:dp,
      payments: mp,
      months: m,
      costTotal: maxTotal,
      maxPayments: maxPayments,
      maxMonths: maxMonths,
			maxCost: maxTotal,
			dpkRoundNumber: dpKnobRoundNumber,
			mpkRoundNumber: mpKnobRoundNumber,
			mkRoundNumber: mKnobRoundNumber
    });
    this.refs.dpKnob.dataLoaded();
    this.refs.mpKnob.dataLoaded();
    this.refs.mKnob.dataLoaded();
    this.recalculateTotals("dp");
  }

  onDownPaymentChange(amount){
    this.setState({ downpayment: amount });
    this.recalculateTotals("dp");
  }

  onMonthlyPaymentsChange(amount){
    this.setState({ payments: amount });
    this.recalculateTotals("mp");
  }

  onMonthsChange(amount){
    this.setState({ months: amount });
    this.recalculateTotals("m");
  }

  onCostTotalChange(amount){
    this.setState({ costTotal: amount });
    this.recalculateTotals("total");
  }

  recalculateTotals(who){
    // do things here to manipulate view

    let dp = this.state.downpayment;
    let mp = this.state.payments;
    let m = this.state.months;
    let maxMonths = this.state.maxMonths;
    let total = this.state.costTotal;
    let maxCost = this.state.maxCost;
    let maxPayments = this.state.maxPayments;
    let adjTotal = 0;
    let adjMP = 0;

    switch( who ){
      case "dp":
        adjTotal = maxCost - dp;
        adjMP = Math.round(adjTotal / m);
        if( mp >= maxPayments){
          //m = Math.round( maxCost - (dp / maxPayments) );
          m = Math.round( (adjTotal / mp) - m );
        }
        break;

      case "mp":
        adjTotal = total;
        adjMP = mp;
        
        if( m <= maxMonths ){
          m = Math.round(total / mp);
        } else {
          dp = maxCost - (maxMonths * mp)
        }
        break;

      case "m":
        
        if( mp > maxPayments ){
          dp = maxCost - (m * maxPayments);
        }
          adjTotal = maxCost - dp;
          adjMP = Math.round(adjTotal / m);
        break;

      case "total":
        adjTotal = maxCost - dp;
        adjMP = Math.round(adjTotal / m);
        break;

      default:
        adjTotal = maxCost - dp;
        adjMP = Math.round(adjTotal / m);
        break;
    }
    

    let totalsObject = {
      downpayment: dp,
      payments: adjMP,
      months: m,
      costTotal: adjTotal
    };
    // SET STATE OF APP
    this.setState(totalsObject);
    // Set values of individual Knobs
    this.refs.dpKnob.setKnobValue( dp );
    this.refs.mpKnob.setKnobValue( adjMP );
    this.refs.mKnob.setKnobValue( m );
    // Set values of Totals Display
    this.refs.display.setValues( totalsObject );
  } 

  componentWillMount(){
    fetch(API_URL)
      .then(response => response.json())
      .then( data => this.initAppData(data) )
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
        </header>
        <div className="fry-grid">
          <div className="fry-grid__10/12">
            <DisplayTotals ref="display" />
          </div>

          <div className="fry-grid__1/1 fry-grid__4/12@m">
            <div className="fry-box">
              <FryKnob ref="dpKnob" roundNumber={ this.state.dpkRoundNumber } settings={ appData.DownPaymentKnobSettings } onChange={this.onDownPaymentChange} />
              <p>Down Payment Amount</p>
            </div>
          </div>
          <div className="fry-grid__1/1 fry-grid__4/12@m">
            <div className="fry-box">
              <FryKnob ref="mpKnob" roundNumber={ this.state.mpkRoundNumber } settings={ appData.MonthlyPaymentsKnobSettings } onChange={this.onMonthlyPaymentsChange} />
              <p>Monthly Payment</p>
            </div>
          </div>
          <div className="fry-grid__1/1 fry-grid__4/12@m">
            <div className="fry-box">
              <FryKnob ref="mKnob" roundNumber={ this.state.mkRoundNumber } settings={ appData.MonthsKnobSettings } onChange={this.onMonthsChange} />
              <p>Number of Months</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;