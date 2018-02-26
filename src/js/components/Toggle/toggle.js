//
//
import React, { Component } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './toggle.scss';

class LockToggle extends Component {
  constructor(props){
		super(props);
		this.state = {
		};
		this.handleToggleChange = this.handleToggleChange.bind(this);
  }

	handleToggleChange(e){

	}

  render(){
    return (
			<div className="toggle">
				<label>
					<Toggle
						defaultChecked={this.state.aubergineIsReady}
						className='toggle-control'
						onChange={this.handleAubergineChange}
					/>
					
				</label>
				<span className="toggle-label">{this.props.label}</span>
			</div>
		);
  }
}

export default LockToggle;