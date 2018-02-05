import React, { Component } from 'react';
import Knob from 'svg-knob';
//import Knob from './knobsrc.js';
import './style.css';

class FryKnob extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      settings: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.detail });
    if (this.props.onChange) this.props.onChange(this.state.value);
  }

  setKnobValue(v){
    this.k.value = v;
  }

  dataLoaded(){
    this.k = new Knob(
      this.dom,
      this.props.settings
    );
    this.dom.addEventListener("change", this.handleChange);
  }

  // Not really necessary, but will slightly improve the rendering performance.
  shouldComponentUpdate() {
    return this.k === null;
  }

  render() {
    return (
      <div className="knob">
        <svg ref = {elem => this.dom = elem} />
      </div>
    );
  }
}

export default FryKnob;
