import React, { Component } from 'react';
import DownPaymentTotal from '../DownPaymentTotal';
import PaymentsTotal from '../PaymentsTotal';
import MonthsTotal from '../MonthsTotal';
import CostTotal from '../CostTotal';
import '../../../styles/fry-style.scss';

class DisplayTotals extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  setValues(data){
    this.setState({
      downpayment: data.downpayment,
      payments: data.payments, 
      months: data.months,
      costTotal: data.costTotal,
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
          <CostTotal value={this.state.costTotal} />
        </div>

      </div>
    );
  }
}

export default DisplayTotals;