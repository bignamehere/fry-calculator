//
//
import React, { Component } from 'react';
import FryKnob from '../../components/Knob/knob';
import Totals from '../../components/displays/Totals/totals';
import Consultation from '../Consultation/consultation';

const API_URL = 'api/data.json';

class Payment extends Component {
  constructor(props){
    super(props);
    this.state = {
      prevInvestment: 3 //set to random number that would never be set by system
    };

    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
    this.onMonthlyPaymentsChange = this.onMonthlyPaymentsChange.bind(this);
    this.onMonthsChange = this.onMonthsChange.bind(this);
    this.onInvestmentChange = this.onInvestmentChange.bind(this);
    this.recalculateTotals = this.recalculateTotals.bind(this);
  }

  initAppData(data){
    console.log("initAppData");
    console.log("IAD : props.investment " + this.props.investment );
    // manipulate the value if using value from Consultation Screen
    let tempInvestment = this.props.investment > 0 ? this.props.investment : data.DownPaymentKnobSettings.value_max;
    this.setState({
      prevInvestment: tempInvestment,
      investment: tempInvestment
    });
    console.log( "IAD : state.investment " + this.state.investment );
    
    this.setState({
      DownPaymentKnobSettings: data.DownPaymentKnobSettings,
      MonthlyPaymentsKnobSettings: data.MonthlyPaymentsKnobSettings,
      MonthsKnobSettings: data.MonthsKnobSettings,
      downpayment: data.DownPaymentKnobSettings.initial_value
    });

    this.refs.dpKnob.dataLoaded();
    this.refs.mpKnob.dataLoaded();
    this.refs.mKnob.dataLoaded();
    
    this.setPaymentsData(data);
    //this.recalculateTotals("dp");

    let totalsObject = {
      downpayment: data.DownPaymentKnobSettings.initial_value,
      payments: data.MonthlyPaymentsKnobSettings.initial_value,
      months: data.MonthsKnobSettings.initial_value,
      amountOwed: tempInvestment
    };
    this.setValues( totalsObject );
    
  }

  setPaymentsData( data ){
    console.log( "setPaymentsData" );
    console.log( "SPD : state.investment " + this.props.investment );
    console.log( "SPD : state.investment "+ this.state.investment );

    this.setState({
      investment: this.state.investment,
      downpayment: data.DownPaymentKnobSettings.initial_value,
      payments: data.MonthlyPaymentsKnobSettings.initial_value,
      months: data.MonthsKnobSettings.initial_value,
      maxPayments: data.MonthlyPaymentsKnobSettings.value_max,
      maxMonths: data.MonthsKnobSettings.value_max,
		  dpKnobRoundNumber: data.DownPaymentKnobSettings.roundNumber,
		  mpKnobRoundNumber: data.MonthlyPaymentsKnobSettings.roundNumber,
		  mKnobRoundNumber: data.MonthsKnobSettings.roundNumber
    });

  }

  onDownPaymentChange(amount){
    this.recalculateTotals("dp", amount);
  }

  onMonthlyPaymentsChange(amount){
    this.recalculateTotals("mp", amount);
  }

  onMonthsChange(amount){
    this.recalculateTotals("m", amount);
  }

  onInvestmentChange(amount){
    this.recalculateTotals("total", amount);
  }

  recalculateTotals(who, amount){
    // do things here to manipulate view

    let dp = this.state.downpayment;
    let mp = this.state.payments;
    let m = this.state.months;
    let maxMonths = this.state.maxMonths;
    let investment = this.props.investment;
    let maxPayments = this.state.maxPayments;
    let amountOwed = 0;
    let adjMP = 0;

    switch( who ){
      case "dp":
        this.setState({ downpayment: amount });
        amountOwed = investment - amount;
        adjMP = Math.round(amountOwed / m);
        if( mp >= maxPayments){
          //m = Math.round( maxCost - (dp / maxPayments) );
          m = Math.round( (amountOwed / mp) - m );
        }
        break;

      case "mp":
        this.setState({ payments: amount });
        amountOwed = investment;
        adjMP = amount;
        
        if( m <= maxMonths ){
          m = Math.round(investment / amount);
        } else {
          dp = investment - (maxMonths * amount)
        }
        break;

      case "m":
        this.setState({ months: amount });
        if( mp > maxPayments ){
          dp = investment - (amount * maxPayments);
        }
          amountOwed = investment - dp;
          adjMP = Math.round(amountOwed / amount);
        break;

      /*
      case "total":
        this.setState({ investment: amount });
        adjTotal = amount - dp;
        adjMP = Math.round(adjTotal / m);
        break;
      */

      default:
        amountOwed = 0;
        adjMP = 0;
        break;
    }
    
    let totalsObject = {
      downpayment: dp,
      payments: adjMP,
      months: m,
      amountOwed: amountOwed
    };
    this.setState( totalsObject );
    this.setValues( totalsObject );
  } 

  setValues( data ){    
    // Set values of individual Knobs
    this.refs.dpKnob.setKnobValue( data.downpayment );
    this.refs.mpKnob.setKnobValue( data.payments );
    this.refs.mKnob.setKnobValue( data.months );
    // Set values of Totals Display
    this.refs.display.setValues( data );
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
    //const { appData } = this.state;
    return (
      <div className="fry-grid app-knob-container">

        <div className="fry-grid__1/1 fry-grid__3/12@m">
          <div className="fry-boxx">

            <FryKnob ref="dpKnob"
              roundNumber={ this.state.dpkRoundNumber }
              settings={ this.state.DownPaymentKnobSettings }
              onChange={ this.onDownPaymentChange }
            />
            <p>Down Payment Amount</p>

          </div>
        </div>
        <div className="fry-grid__1/1 fry-grid__4/12@m">
          <div className="fry-boxx">

            <FryKnob ref="mpKnob"
              roundNumber={ this.state.mpkRoundNumber }
              settings={ this.state.MonthlyPaymentsKnobSettings }
              onChange={ this.onMonthlyPaymentsChange }
            />
            <p>Monthly Payment</p>

          </div>
        </div>
        <div className="fry-grid__1/1 fry-grid__3/12@m">
          <div className="fry-boxx">
          
            <FryKnob ref="mKnob"
              roundNumber={ this.state.mkRoundNumber }
              settings={ this.state.MonthsKnobSettings }
              onChange={ this.onMonthsChange }
            />
            <p>Number of Months</p>

          </div>
        </div>

        <div className="fry-grid">

          <div className="fry-grid__10/12">
            <Totals ref="display"/>
          </div>

        </div>

      </div>
		);
	}
}

export default Payment;