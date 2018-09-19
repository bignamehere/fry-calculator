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

  setText(data){
    let dp1 = data.instructionsText.split("|dpZeroMin|")[0];
    let dp2 = data.instructionsText.split("|dpZeroMin|")[1];
    
    let newText = dp1 + this.props.dpAmount + dp2;

    let m1 = newText.split("|mZeroMax|")[0];
    let m2 = newText.split("|mZeroMax|")[1];

    newText = m1 + this.props.mAmount + m2;
    
    this.setState({
      instructionsText: newText,
    });
  }

  render() {
    return (
        <p className="instructions">{this.state.instructionsText}</p> 
    );
  }
}

export default Instructions;