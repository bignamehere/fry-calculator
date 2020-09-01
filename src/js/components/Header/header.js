//
//
import React, { Component } from 'react';
import logo from '../../../img/freytag-logo-w.png';
import './header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
		};
  }

  setText(data){
		this.setState({
			headerText: data.headerTextLabel
		});
  }


	render() {
    return (
			<div className="fry-header-app">
				<div className="fry-header-app__bd">
					<div className="fry-header-app__primary">
						<span className="fry-header-app__app-name">
							<span className="header-custom__app-name">{this.state.headerText}</span>
						</span>
					</div>
					<div className="fry-header-app__secondary">
						<img src={logo} className="logo" alt="logo" />
					</div>
				</div>
			</div>
		);
	}
}

export default Header;