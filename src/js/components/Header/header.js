// author: bignamehere
//
import React, { Component } from 'react';
import logo from '../../../img/fry_website_logo2016.png';
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
						<a class="fry-header-app__home-link" href="boilerplate.html" title="Link to YAFANS home">
							<span class="fry-header-app__app-name">
								<abbr class="fry-header-app__app-abbr" title="Electronic Loan Deficiency Payment Schedule"><img src={logo} className="logo" alt="logo" /></abbr>
								<span class="fry-header-app__app-full">Braces Cost Calculator</span>
							</span>
						</a>
					</div>
					<div class="fry-header-app__secondary">
						<span class="fry-header-app__profile">
							<h1>testing Tabs</h1>
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;