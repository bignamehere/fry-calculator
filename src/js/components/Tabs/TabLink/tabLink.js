// author: bignamehere
//
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import appStore from './stores/appStore';

const store = appStore();
const history = syncHistoryWithStore(browserHistory, store);

class TabLink extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

	onClick(e){
		store.dispatch( push(this.props.url) );
	}

	render() {
    return (
			<a className="fry-content-tabs__label" href="">
        <span className="fry-content-tabs__label-text">
					{ this.props.label }
        </span>
      </a>
		);
	}
}

export default TabLink;