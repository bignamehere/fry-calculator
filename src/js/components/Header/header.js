// author: bignamehere
//
import React, { Component } from 'react';
import logo from '../../../img/fry-logo-w.png';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

	render() {
    return (
			<div class="fry-header-app">
				<div class="fry-header-app__bd">
					<div class="fry-header-app__primary">
						<span class="fry-header-app__app-name">
							<span class="fry-header-app__app-full">Braces Cost Calculator</span>
						</span>
					</div>
					<div class="fry-header-app__secondary">
						<img src={logo} className="logo" alt="logo" />
					</div>
				</div>
			</div>
		);
	}
}

export default Header;