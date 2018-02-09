import React, { Component } from 'react';

class CostTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h1>${this.props.value}</h1>
        <h5>Amount Financing</h5> 
      </div>
    );
  }
}

export default CostTotal;