//
//
import React, { Component } from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import InkTabBar from 'rc-tabs/lib/InkTabBar';
import './appTabs.scss';
// Views
import Consultation from '../../views/Consultation/consultation';
import Payment from '../../views/Payment/payment';
import Savings from '../../views/Savings/savings';

class AppTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investment: 0
    };
    this.handleInvestmentChange = this.handleInvestmentChange.bind(this);
  }

  handleTabChange(e){
    
  }

  handleInvestmentChange(e){
    this.setState({
      investment: e.investment
    });
    this.resetAmount(e.investment);
  }

  resetAmount(amount){
    if(this.refs.paymentTab) this.refs.paymentTab.onInvestmentChange(amount);
  }

	render() {
    let style = {
      height: 650
    };
    //const { investment } = this.state;
    return (
      <Tabs
        defaultActiveKey="1"
        renderTabBar={() => <InkTabBar onTabClick={this.onTabClick}/>}
        renderTabContent={() => <TabContent style={style}/>}
        onChange={this.handleTabChange}
      >
        <TabPane tab='Consultation' key="1">
          <Consultation onChange={this.handleInvestmentChange}/>
        </TabPane>
        <TabPane tab='Payment' key="2">
          <Payment ref="paymentTab" investment={ this.state.investment } />
        </TabPane>
        <TabPane tab='Savings' key="3">
          <Savings />
        </TabPane>
      </Tabs>
		);
	}
}

export default AppTabs;