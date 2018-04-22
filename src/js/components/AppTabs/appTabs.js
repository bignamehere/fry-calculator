//
//
import React, { Component } from 'react';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
//import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
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
      paymentDisabled: true,
      paymentConfig: {}
    };
    this.handleInvestmentChange = this.handleInvestmentChange.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.setConfig = this.setConfig.bind(this);
    this.setText = this.setText.bind(this);
  }

  componentWillMount(){
    console.log("appTabs - cWm");
  }

  componentDidMount(){
    console.log('appTabs - cDm');
    if(this.refs.consultationTab) console.log("consultationTab EXIST");
    if(this.refs.paymentTab) console.log("paymentTab EXIST");
  }

  setConfig(data){
    console.log("appTabs - setConfig()");
    this.setState({
      paymentConfig: data
    });
    if(this.refs.paymentTab) this.refs.paymentTab.setData(data);
  }

  setText(data){
    console.log("appTabs - setText()");
    if(this.refs.consultationTab) this.refs.consultationTab.setText(data);
    if(this.refs.paymentTab) this.refs.paymentTab.setText(data);

    this.setState({
      tabOneLabel: data.tabOneLabel,
      tabTwoLabel: data.tabTwoLabel
    })
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
        <TabPane tab={this.state.tabOneLabel} key="1" forceRender={true}>
          <Consultation ref='consultationTab' onContinue={this.handleContinue} onChange={this.handleInvestmentChange} />
        </TabPane>
        <TabPane tab={this.state.tabTwoLabel} key="2" forceRender={true} disabled={this.state.paymentDisabled}>
          <Payment ref="paymentTab" investment={ this.state.investment } />
        </TabPane>
        
      </Tabs>
		);
	}
}

export default AppTabs;