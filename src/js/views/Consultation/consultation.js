//
//
import React, { Component } from 'react';

class Consultation extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  // NOT IN USE
  // add " onBlur={this.handleBlur} " to input
  handleBlur(e){
    let total = this.getInvestment();
    this.setState({
      investment: total
    });
  }

  handleClick(e){
    let total = this.getInvestment();
    this.setState({
      investment: total
    });
    if (this.props.onChange) this.props.onChange( {investment: total } );
  }

  getInvestment(){

    let initialCost = isNaN(document.getElementById('initialCost').value) ? "" : parseInt(document.getElementById('initialCost').value); 
    let insurance = isNaN(document.getElementById('insurance').value) ? "" : parseInt(document.getElementById('insurance').value);
    let discounts = isNaN(document.getElementById('discounts').value) ? "" : parseInt(document.getElementById('discounts').value);

    let total = isNaN(initialCost - (insurance + discounts)) ? "" : initialCost - (insurance + discounts);
    return total;
  }


	render(){
    return (
      <div className={"fry-section"}>
        <div className={"fry-section__bd"}>
          <h1>Initial Consultation Settings</h1>
          <div className={"fry-grid"}>
            <div className={"fry-grid__1 fry-grid__1/2@m"}>
              
                <div className={"fry-field"}>
                  <label className={"fry-field__label"} htmlFor="initialCost">Initial Cost <span className="fry-field__label-desc">Required</span></label>
                  <input className={"fry-input fry-field__item"} id="initialCost" name="initialCost" type="item" placeholder="$" value={this.state.initialCost}/>
                </div>
              
                <div className={"fry-field"}>
                  <label className={"fry-field__label"} htmlFor="insurance">Insurance Amount </label>
                  <input className={"fry-input fry-field__item"} id="insurance" name="insurance" type="item" placeholder="$" value={this.state.insurance}/>
                </div>
              
                <div className={"fry-field"}>
                  <label className={"fry-field__label"} htmlFor="discounts">Discounts </label>
                  <input className={"fry-input fry-field__item"} id="discounts" name="discounts" type="item" placeholder="$" value={this.state.discounts}/>
                </div>
              
            </div>
            <div className={"fry-grid__1 fry-grid__1/2@m"}>
              <div className={"fry-box"}>
                <h1>Investment Amount</h1>
                <h1>${this.state.investment}</h1>
              </div>
              <div>
                <p>
                  <button onClick={this.handleClick} className="fry-btn fry-btn--secondary fry-btn--large" type="button">Update Settings</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

export default Consultation;