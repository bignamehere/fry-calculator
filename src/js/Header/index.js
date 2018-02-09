import React, { Component } from 'react';
import logo from '../../img/fry_website_logo2016.png';
import './style.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

	render() {
    return (
			<header className="header">
				<img src={logo} className="logo" alt="logo" />
			</header>
		);
	}
}

export default Header;