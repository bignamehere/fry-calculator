import React, { Component } from 'react';
import Knob from './knob';
import './style.css';

class SvgKnob extends Component {
  constructor(props) {
    super(props);
    this.state = { knobSettings: {} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.detail });
  }

  componentWillMount(){
    // need to update to pass in below object from parent
    console.log("+++");
    console.log(this.props.knobSettings);
    this.setState({ knobSettings: this.props.knobSettings });
  }

  render() {
    const { knobSettings } = this.state;
    return (
      <div className="knob">
        <Knob onChange={this.handleChange} settings={knobSettings} />
      </div>
    );
  }
}

export default SvgKnob;
