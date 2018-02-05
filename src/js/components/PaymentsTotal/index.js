import React, { Component } from 'react';
import '../../../styles/fry-style.scss';

class PaymentsTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h1>${this.props.value}</h1>
        <h5>Montly Payment</h5> 
      </div>
    );
  }
}

export default PaymentsTotal;