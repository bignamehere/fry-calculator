import React, { Component } from 'react';
import '../../../styles/fry-style.scss';

class DownPaymentTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h1>${this.props.value}</h1>
        <h5>Down Payment</h5> 
      </div>
    );
  }
}

export default DownPaymentTotal;