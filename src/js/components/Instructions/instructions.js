//
//
import React, { Component } from 'react';
import './instructions.scss';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }

  componentWillMount(){

  }

  render() {
    return (
        <p className="instructions">A minimum Down Payment of ${this.props.dpAmount}  is required to extend financing beyond {this.props.mAmount} months.</p>
    );
  }
}

export default Instructions;