//
//
import React, { Component } from 'react';
import DownPaymentTotal from '../DownPaymentTotal/downPaymentTotal';
import PaymentsTotal from '../PaymentsTotal/paymentsTotal';
import MonthsTotal from '../MonthsTotal/monthsTotal';
import CostTotal from '../CostTotal/costTotal';

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
      amountOwed: data.amountOwed,
    });
  }

  render() {
    return (
      <div className="fry-grid">
        
        <div className="fry-grid__1/2 fry-grid__1/4@m"> 
          <DownPaymentTotal value={this.state.downpayment} />
        </div>
        <div className="fry-grid__1/2 fry-grid__1/4@m">
          <PaymentsTotal value={this.state.payments} />
        </div>
        <div className="fry-grid__1/2 fry-grid__1/4@m">
          <MonthsTotal value={this.state.months} />
        </div>
        <div className="fry-grid__1/2 fry-grid__1/4@m">
          <CostTotal value={this.state.amountOwed} />
        </div>

      </div>
    );
  }
}

export default Totals;