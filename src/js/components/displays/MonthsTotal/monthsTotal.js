// author: bignamehere
//
import React, { Component } from 'react';

class MonthsTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h1>{this.props.value}</h1>
        <h5>Months</h5> 
      </div>
    );
  }
}

export default MonthsTotal;