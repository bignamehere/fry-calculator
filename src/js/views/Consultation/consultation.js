//
//
import React, { Component } from 'react';

class Consultation extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
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

  handleUpdateClick(e){
    let total = this.getInvestment();
    this.setState({
      investment: total
    });
    if (this.props.onChange) this.props.onChange( {investment: total } );
  }

  handleContinueClick(e){
    let total = this.getInvestment();
    this.setState({
      investment: total
    });
    if (this.props.onContinue) this.props.onContinue( {activeKey: 2 } );
  }

  getInvestment(){

    let initialCost = document.getElementById('initialCost').value <= 0 ? 0 : parseInt(document.getElementById('initialCost').value); 
    let insurance = document.getElementById('insurance').value  <= 0 ? 0 : parseInt(document.getElementById('insurance').value);
    let discounts = document.getElementById('discounts').value <= 0 ? 0 : parseInt(document.getElementById('discounts').value);

    console.log( initialCost + " " + insurance + " " + discounts );
    let total = isNaN(initialCost - (insurance + discounts)) ? "" : initialCost - (insurance + discounts);
    return total;
  }


	render(){
    return (
      <div className={"fry-section"}>
        <div className={"fry-section__bd"}>
          <h1 className={"rc-tab-panel__header"}>Initial Consultation Settings</h1>

          <div className={"fry-grid"}>
            
            <div className={"fry-grid__1/1 fry-grid__1/2@m"}>
              
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
                <div className={"fry-grid"}>
                  <div className={"fry-grid__1/1"}>
                    <button onClick={this.handleUpdateClick} className="fry-btn fry-btn--secondary fry-btn--large" type="button">Update Settings</button>
                  </div>
                </div>
            </div>

            <div>
              <div className={"fry-grid__1/1 rc-tab-display-lg"}>
                <div className={"fry-box"}>
                  <h1>Investment Amount</h1>
                  <p>Your initial investment for Orthodontic Braces is valued at:</p>
                  <h1>${this.state.investment}</h1>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
		);
	}
}

export default Consultation;