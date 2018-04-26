//
//
import React, { Component } from 'react';
import logo from '../../../img/cardinal-logo-white.png';
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
			<div className="card-header-app">
				<div className="card-header-app__bd">
					<div className="card-header-app__primary">
						<span className="card-header-app__app-name">
							<span className="header-custom__app-name">{this.state.headerText}</span>
						</span>
					</div>
					<div className="card-header-app__secondary">
						<img src={logo} className="logo" alt="logo" />
					</div>
				</div>
			</div>
		);
	}
}

export default Header;