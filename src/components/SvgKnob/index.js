import React, { Component } from 'react';
import Knob from './knob';
import './style.css';


function Value(props) {
  return <div className = "value" > {
    props.value
  } </div>;
}

class SvgKnob extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.detail
    });
  }

  componentWillMount(){

    // need to update to pass in below object from parent

    this.setState({ knobSettings: this.props.knobSettings });
  }

  render() {
    return (
      <div className="knob">
        <Knob onChange={this.handleChange} settings={this.state.knobSettings} />
      </div>
    );
  }
}

export default SvgKnob;
