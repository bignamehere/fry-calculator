//
//
import React, { Component } from 'react';
import './disclaimer.scss';

class Disclaimer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      langButtonLabel: "LANG"
    };
    this.handleLanguageClick = this.handleLanguageClick.bind(this);
  }

  componentWillMount(){
    let year = new Date().getFullYear();
    this.setState({
      theYear: year
    });
  }

  handleLanguageClick(e){
    if (this.props.onChangeLanguage) this.props.onChangeLanguage( this.state.lang );
  }


  setText(data){
    let t1 = data.disclaimerText.split("|copyright|")[0];
    let t2 = data.disclaimerText.split("|copyright|")[1];
    let newText = t1 + "©" + this.state.theYear + t2;
    this.setState({
      disclaimerText: newText,
      langButtonLabel: data.langButtonLabel 
    });
  }

  render() {
    return (
      <div className="disclaimer">
        <p>{this.state.disclaimerText} | <button onClick={this.handleLanguageClick} className={"fry-btn fry-btn--flat"}>{this.state.langButtonLabel}</button></p> 
      </div>
    );
  }
}

export default Disclaimer;