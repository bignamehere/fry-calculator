// author: bignamehere
//
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TabLink from './TabLink/tabLink';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

	render() {
    return (
			<div className="fry-content-tabs--light">
        <ul className="fry-content-tabs__list">
          <li className="fry-content-tabs__item">
            <TabLink url='/consultation' label='Consultation' />
          </li>
          <li className="fry-content-tabs__item">
            <TabLink url='/payment' label='Payment' />
          </li>
          <li className="fry-content-tabs__item">
            <TabLink url='/savings' label='Savings' />
          </li>
        </ul>
        <div class="fry-content-tabs__aside"></div>
      </div>
		);
	}
}

export default Tabs;