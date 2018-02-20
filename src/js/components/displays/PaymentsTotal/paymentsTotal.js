//
//
import React, { Component } from 'react';

class PaymentsTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h2>${this.props.value}</h2>
        <h5>Montly Payment</h5> 
      </div>
    );
  }
}

export default PaymentsTotal;