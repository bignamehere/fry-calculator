//
//
import React, { Component } from 'react';

class CostTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h2>${this.props.value}</h2>
        <h5>Investment</h5> 
      </div>
    );
  }
}

export default CostTotal;