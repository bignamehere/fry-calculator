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

  render() {
    return (
      <div className="fry-grid fry-grid--no-gutter">
        
        <div className="fry-grid__1/2 fry-grid__1/4@m">
          <CostTotal value={this.state.investment} label={'Investment'} />
        </div>

        <div className="fry-grid__1/2 fry-grid__1/4@m"> 
          <DownPaymentTotal value={this.state.downpayment} label={'Down Payment'} />
        </div>
        
        <div className="fry-grid__1/2 fry-grid__1/4@m">
          <MonthsTotal value={this.state.months} label={'Months'} />
        </div>

        <div className="fry-grid__1/2 fry-grid__1/4@m">
          <PaymentsTotal value={this.state.payments} label={'Monthly Payment'} />
        </div>
        
      </div>
    );
  }
}

export default Totals;