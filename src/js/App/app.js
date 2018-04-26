//
//
import React, { Component } from 'react';
import './app.css';
import Header from '../components/Header/header';
import AppTabs from '../components/AppTabs/appTabs';
import Disclaimer from '../components/Disclaimer/disclaimer';

const API_URL = 'api/data.json';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      language: "",
      appConfig: {},
      allAppText: {},
      appText: {}
    };
    this.setApplicationText = this.setApplicationText.bind(this);
    this.setApplicationLanguage = this.setApplicationLanguage.bind(this);
  }

  componentWillMount(){
    console.log('app - cWm');
    fetch(API_URL)
    .then(response => response.json())
    .then( data => this.initApplicationData(data) )
    .catch(function(error) {
      console.log(error);
    });
  }

  componentDidMount(){
    console.log('app - cDm');
  }

  initApplicationData(data){
    console.log('app - initApplicationData()');
    this.setState({
      appConfig: data.AppConfig,
      allAppText: data.AppText,
      language: data.InitialLanguage
    });
    this.setApplicationConfig();
    this.setApplicationText(data.InitialLanguage);
  }

  setApplicationConfig(){
    console.log('app - setApplicationConfig()');
    if(this.refs.appTabs) this.refs.appTabs.setConfig(this.state.appConfig);
  }

  setApplicationText(lang){
    console.log('app - setApplicationText()');
    let text = lang === "en" ? this.state.allAppText.en : this.state.allAppText.es

    this.setState({ appText: text });

    if(this.refs.appHeader) this.refs.appHeader.setText(text);
    if(this.refs.appTabs) this.refs.appTabs.setText(text);
    if(this.refs.appDisclaimer) this.refs.appDisclaimer.setText(text);
  }

  setApplicationLanguage(){
    let lang = this.state.language === "en" ? "es" : "en";
    this.setState({
      language: lang
    });
    this.setApplicationText(lang);
  }


  render() {
    return (
      <div>
        <Header ref="appHeader"/>
        <div className={'card-nav-global'}>
          <div className={'card-nav-global__bd'}>
            <AppTabs ref="appTabs" />
          </div>
        </div>
        <Disclaimer ref="appDisclaimer" onChangeLanguage={this.setApplicationLanguage} />
      </div>
    );
  }
}

export default App;