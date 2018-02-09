import React, { Component } from 'react';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

	render() {
    return (
			<div className="fry-content-tabs">
        <ul className="fry-content-tabs__list">
          <li className="fry-content-tabs__item">
            <a className="fry-content-tabs__label fry-content-tabs__label--active" href="#link">
              <span className="fry-content-tabs__label-text">Consultation</span>
            </a>
          </li>
          <li className="fry-content-tabs__item">
            <a className="fry-content-tabs__label fry-content-tabs__label--active" href="#link">
              <span className="fry-content-tabs__label-text">Payments</span>
            </a>
          </li>
          <li className="fry-content-tabs__item">
            <a className="fry-content-tabs__label fry-content-tabs__label--active" href="#link">
              <span className="fry-content-tabs__label-text">Savings</span>
            </a>
          </li>
        </ul>
      </div>
		);
	}
}

export default Tabs;