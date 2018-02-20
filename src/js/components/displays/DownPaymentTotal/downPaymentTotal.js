//
//
import React, { Component } from 'react';

class DownPaymentTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h2>${this.props.value}</h2>
        <h5>Down Payment</h5> 
      </div>
    );
  }
}

export default DownPaymentTotal;