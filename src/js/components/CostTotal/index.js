import React, { Component } from 'react';
import '../../../styles/fry-style.scss';

class CostTotal extends Component {
  render() {
    return (
      <div className="fry-box">
        <h1>${this.props.value}</h1>
        <h5>Balance Remaining</h5> 
      </div>
    );
  }
}

export default CostTotal;