import React, { Component } from 'react';
import Knob from './knob';
import './style.css';


function Value(props) {
    return <div className="value">{props.value}</div>;
}

class SvgKnob extends Component {

    constructor(props){
        super(props);
        this.state = { 
            value_min: 0,
            value_max: 5700,
            initial_value: 500
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            value: e.detail
        });
    }


    render() {
        return (
            <div className="knob">
                <Knob onChange={this.handleChange} />
                <Value value={this.state.value} />
            </div>
        );
    }
}

export default SvgKnob;