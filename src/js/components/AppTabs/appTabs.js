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
//import Savings from '../../views/Savings/savings';

class AppTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investment: 0,
      paymentDisabled: true
    };
    this.handleInvestmentChange = this.handleInvestmentChange.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleContinue(v){
    this.refs.appTabs.setActiveKey( v.toString() );
  }

  handleInvestmentChange(e){
    this.setState({
      investment: e.investment
    });
    this.resetAmount(e.investment);
  }

  resetAmount(amount){
    console.log("resetAmount = " + amount);
    this.setState({
      paymentDisabled: false,
      investment: amount
    });
    if(this.refs.paymentTab) this.refs.paymentTab.onInvestmentChange(amount);
  }

	render() {

    //const { paymentPane } = this.state;
    return (
      <Tabs
        ref="appTabs"
        defaultActiveKey="1"
        renderTabBar={() => <InkTabBar ref="inktab" onTabClick={this.onTabClick}/>}
        renderTabContent={() => <TabContent/>}
        //onChange={this.handleTabChange}
      >
        <TabPane tab='Consultation' key="1">
          <Consultation onContinue={this.handleContinue} onChange={this.handleInvestmentChange}/>
        </TabPane>
        <TabPane tab='Payment' key="2" disabled={this.state.paymentDisabled}>
          <Payment ref="paymentTab" investment={ this.state.investment } />
        </TabPane>
        
      </Tabs>
		);
	}
}

export default AppTabs;