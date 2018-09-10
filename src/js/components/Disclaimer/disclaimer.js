//
//
import React, { Component } from 'react';
import './disclaimer.scss';

class Disclaimer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }

  componentWillMount(){
    let year = new Date().getFullYear();
    this.setState({
      theYear: year
    });
  }

  render() {
    return (
      <div className="disclaimer">
        <p>* All prices and amounts are for demonstration purposes only. ©{this.state.theYear} Fry Orthodontics Specialists. All rights reserved.</p> 
      </div>
    );
  }
}

export default Disclaimer;