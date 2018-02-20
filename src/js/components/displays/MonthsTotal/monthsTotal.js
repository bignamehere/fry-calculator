//
//
import React, { Component } from 'react';

class MonthsTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h2>{this.props.value}</h2>
        <h5>Months</h5> 
      </div>
    );
  }
}

export default MonthsTotal;