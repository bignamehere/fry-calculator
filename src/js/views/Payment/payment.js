//
//
import React, { Component } from 'react';
import FryKnob from '../../components/Knob/knob';
import Totals from '../../components/displays/Totals/totals';
import Consultation from '../Consultation/consultation';
import LockIcon from '../../components/icons/Lock/lockIcon';

const API_URL = 'api/data.json';

class Payment extends Component {
  constructor(props){
    super(props);
    this.state = {
      prevInvestment: 3, //set to random number that would never be set by system
      dpKnobLocked: false,
      mpKnobLocked: false,
      mKnobLocked: false
    };

    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
    this.onMonthlyPaymentsChange = this.onMonthlyPaymentsChange.bind(this);
    this.onMonthsChange = this.onMonthsChange.bind(this);
    this.onInvestmentChange = this.onInvestmentChange.bind(this);
    this.recalculateTotals = this.recalculateTotals.bind(this);
    this.setKnobLock = this.setKnobLock.bind(this);
  }

  componentWillMount(){
    console.log("Payments - componentWillMount")
    fetch(API_URL)
      .then(response => response.json())
      .then( data => this.initAppData(data) )
      .catch(function(error) {
        console.log(error);
      });  
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

    this.setState({
      DownPaymentKnobSettings: data.DownPaymentKnobSettings,
      MonthlyPaymentsKnobSettings: data.MonthlyPaymentsKnobSettings,
      MonthsKnobSettings: data.MonthsKnobSettings,
      investment: tempInvestment,
      downpayment: data.DownPaymentKnobSettings.initial_value,
      payments: data.MonthlyPaymentsKnobSettings.initial_value,
      months: data.MonthsKnobSettings.initial_value,
      maxPayments: data.MonthlyPaymentsKnobSettings.value_max,
      maxMonths: data.MonthsKnobSettings.value_max,
		  dpkRoundNumber: data.DownPaymentKnobSettings.roundNumber,
		  mpkRoundNumber: data.MonthlyPaymentsKnobSettings.roundNumber,
		  mkRoundNumber: data.MonthsKnobSettings.roundNumber
    });

    this.refs.dpKnob.dataLoaded();
    this.refs.mpKnob.dataLoaded();
    this.refs.mKnob.dataLoaded();

    console.log( "IAD : state.investment " + this.state.investment );
    
    //this.setPaymentsData(data);
    console.log( "setPaymentsData" );
    console.log( "SPD : state.investment " + this.props.investment );
    console.log( "SPD : state.investment "+ this.state.investment );

    // SET INITIAL STATE OF KNOBS
    this.recalculateTotals("total", tempInvestment);
  }



  recalculateTotals(who, amount){
    // do things here to manipulate view
    console.log( "recalculateTotals " + who );

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
      
          if(!this.state.dpKnobLocked) dp = amount;

          amountOwed = investment - dp;
          adjMP = Math.round(amountOwed / m);
          if( mp >= maxPayments){
            //m = Math.round( maxCost - (dp / maxPayments) );
            m = Math.round( (amountOwed / mp) - m );
          }

        break;

      case "mp":
        amountOwed = investment;
        if(!this.state.mpKnobLocked) adjMP = amount;
        else adjMP = mp;
        
        if( m < maxMonths ){
          m = Math.round( (amountOwed - dp) / amount );
          if( dp <= 0){
            dp = 0;
          }
        } else {
          if( dp <= 0){
            dp = 0;
            if(adjMP > this.state.payments) {
              console.log("up")
              m = Math.round( amountOwed / adjMP);
            } else {
              console.log("down");
              m = maxMonths;
              adjMP = this.state.payments;
              dp = Math.round( amountOwed - (adjMP * m) );
            }
          }else if(dp >= investment){
            m = Math.round( amountOwed / amount);
          }else{
            dp = Math.round( amountOwed - (adjMP * m) );
          }
        }

        break;

      case "m":
        if(!this.state.mKnobLocked) m = amount;
        if( mp > maxPayments ){
          dp = investment - (m * maxPayments);
        }
          amountOwed = investment - dp;
          adjMP = Math.round(amountOwed / m);
        break;
      
      case "total":
        this.setState({ investment: amount });
        amountOwed = amount - dp;
        adjMP = Math.round(amountOwed / m);
        break;

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

  rCal(dp,mp,m,o){
    let totalsObject = {
      downpayment: dp,
      payments: mp,
      months: m,
      amountOwed: o
    };
    this.setState( totalsObject );
    this.setValues( totalsObject );
  }

  setValues( data ){
    console.log("setValues");
    // Set values of individual Knobs
    this.refs.dpKnob.setKnobValue( data.downpayment );
    this.refs.mpKnob.setKnobValue( data.payments );
    this.refs.mKnob.setKnobValue( data.months );
    // Set values of Totals Display
    this.refs.display.setValues( data );
  }

  getPaymentParameters(){
    return {
      dp: this.state.downpayment,
      mp: this.state.payments,
      m: this.state.months,
      maxMonths: this.state.maxMonths,
      investment: this.props.investment,
      maxPayments: this.state.maxPayments,
      amountOwed: 0,
      adjMP: 0
    };
  }

  onDownPaymentChange(amount){
    this.recalculateTotals("dp", amount);
    /*
    let o = this.getPaymentParameters();

    if(!this.state.dpKnobLocked) o.dp = amount;
    o.amountOwed = o.investment - amount;
    o.adjMP = Math.round(o.amountOwed / o.m);
    if( o.mp >= o.maxPayments){
      //m = Math.round( maxCost - (dp / maxPayments) );
      o.m = Math.round( (o.amountOwed / o.mp) - o.m );
    }

    this.rCal( o.dp, o.adjMP, o.m, o.amountOwed);
    */
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

  setKnobLock(e){
    // do things here to lock the knob
    console.log(e.id + " ???  ");
    let boo = e.value ? false : true;
    switch (e.id){
      case "dp":
        console.log("dpKnob");
        this.refs.dpKnob.setKnobLock( boo );
        this.setState({ dpKnobLocked: boo});
        //
        this.refs.mpKnob.setKnobLock( false );
        this.refs.mpLock.setToggle(false);
        //
        this.refs.mKnob.setKnobLock( false );
        this.refs.mLock.setToggle(false);
        //
        this.setState({ mpKnobLocked: false});
        this.setState({ mKnobLocked: false});
        break;
      case "mp":
        console.log("mpKnob");
        this.refs.mpKnob.setKnobLock( boo );
        this.setState({ mpKnobLocked: boo});

        this.refs.dpKnob.setKnobLock( false );
        this.refs.dpLock.setToggle(false);
        //
        this.refs.mKnob.setKnobLock( false );
        this.refs.mLock.setToggle(false);
        //
        this.setState({ dpKnobLocked: false});
        this.setState({ mKnobLocked: false});
        
        break;
      case "m":
        console.log("mKnob");
        this.refs.mKnob.setKnobLock( boo );
        this.setState({ mKnobLocked: boo});
        //
        this.refs.dpKnob.setKnobLock( false );
        this.refs.dpLock.setToggle(false);
        //
        this.refs.mpKnob.setKnobLock( false );
        this.refs.mpLock.setToggle(false);
        //
        this.setState({ dpKnobLocked: false});
        this.setState({ mpKnobLocked: false});
        
        break;
      default:
        break;
    }

  }

	render() {
    //const { appData } = this.state;
    return (
      
        <div className="fry-grid app-knob-container">

          <div className="fry-grid__1/1 fry-grid__1/12@m"></div>

          <div className="fry-grid__1/1 fry-grid__3/12@m">
            <div className="knob-container">

              <FryKnob ref="dpKnob"
                roundNumber={ this.state.dpkRoundNumber }
                settings={ this.state.DownPaymentKnobSettings }
                onChange={ this.onDownPaymentChange }
              />
              <LockIcon
                className="knob-lock"
                ref="dpLock"
                onToggle={this.setKnobLock}
                lockId="dp"
              />
              <h4>Down Payment</h4>
            </div>
          </div>
          <div className="fry-grid__1/1 fry-grid__4/12@m">
            <div className="knob-container">

              <FryKnob ref="mpKnob"
                roundNumber={ this.state.mpkRoundNumber }
                settings={ this.state.MonthlyPaymentsKnobSettings }
                onChange={ this.onMonthlyPaymentsChange }
              />
              <LockIcon
                className="knob-lock"
                ref="mpLock"
                onToggle={this.setKnobLock}
                lockId="mp"
              />
              <h4>Monthly Payments</h4>
            </div>
          </div>
          <div className="fry-grid__1/1 fry-grid__3/12@m">
            <div className="knob-container">
            
              <FryKnob ref="mKnob"
                roundNumber={ this.state.mkRoundNumber }
                settings={ this.state.MonthsKnobSettings }
                onChange={ this.onMonthsChange }
              />
              <LockIcon
                className="knob-lock"
                ref="mLock"
                onToggle={this.setKnobLock}
                lockId="m"
              />
              <h4>Months</h4>
            </div>
          </div>

          <div className="fry-grid__1/1 fry-grid__1/12@m"></div>
        
          <div className="fry-grid__1/1">
            <Totals ref="display"/>
          </div>
        </div>
		);
	}
}

export default Payment;