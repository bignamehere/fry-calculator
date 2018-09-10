//
//
import React, { Component } from 'react';

class DownPaymentTotal extends Component {
  render() {
    return (
      <div className="fry-box fry-box-condensed">
        <div className="fry-box__content--lg fry-box__centered">${this.props.value}</div>
        <div className="fry-box__content--m fry-box__centered">Down Payment</div> 
      </div>
    );
  }
}

export default DownPaymentTotal;