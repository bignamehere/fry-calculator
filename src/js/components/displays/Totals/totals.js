//
//
import React, { Component } from 'react';
import DownPaymentTotal from '../DownPaymentTotal/downPaymentTotal';
import PaymentsTotal from '../PaymentsTotal/paymentsTotal';
import MonthsTotal from '../MonthsTotal/monthsTotal';
import CostTotal from '../CostTotal/costTotal';
import './totals.scss';

class Totals extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  setValues(data){
    this.setState({
      downpayment: data.downpayment,
      payments: data.payments, 
      months: data.months,
      investment: data.investment
    });
  }

  setText(data){
    this.setState({
      investmentDisplayLabel: data.investmentDisplayLabel,
      downPaymentDisplayLabel: data.downPaymentDisplayLabel,
      monthlyPaymentsDisplayLabel: data.monthlyPaymentsDisplayLabel,
      monthsDisplayLabel: data.monthsDisplayLabel
    });
  }

  render() {
    return (
      <div className="card-grid card-grid--no-gutter">
        
        <div className="card-grid__1/2 card-grid__1/4@m">
          <CostTotal ref="costTotal" value={this.state.investment} label={this.state.investmentDisplayLabel} />
        </div>

        <div className="card-grid__1/2 card-grid__1/4@m"> 
          <DownPaymentTotal ref="downPaymentTotal" value={this.state.downpayment} label={this.state.downPaymentDisplayLabel} />
        </div>
        
        <div className="card-grid__1/2 card-grid__1/4@m">
          <MonthsTotal ref="monthsTotal" value={this.state.months} label={this.state.monthsDisplayLabel} />
        </div>

        <div className="card-grid__1/2 card-grid__1/4@m">
          <PaymentsTotal ref="paymentsTotal" value={this.state.payments} label={this.state.monthlyPaymentsDisplayLabel} />
        </div>
        
      </div>
    );
  }
}

export default Totals;