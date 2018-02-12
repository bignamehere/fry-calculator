// author: bignamehere
//
import React, { Component } from 'react';

class Consultation extends Component {
  constructor(props){
    super(props);
    this.state = {
      appData: {}
    };
  }

  handleClick(e){

  }

	render() {
    return (
      <div className={"fry-section"}>
        <div className={"fry-section__bd"}>
          <h1>Initial Consultation Settings</h1>
          <div className={"fry-grid"}>
            <div className={"fry-grid__1 fry-grid__1/2@m"}>
              <p>
                <div className={"fry-field"}>
                  <label className={"fry-field__label"} for="initialCost">Initial Cost <span class="fry-field__label-desc">Required</span></label>
                  <input className={"fry-input fry-field__item"} id="initialCost" name="initialCost" type="item" placeholder="$" value={this.state.initialCost}/>
                </div>
              </p>
              <p>
                <div className={"fry-field"}>
                  <label className={"fry-field__label"} for="insurance">Insurance Amount </label>
                  <input className={"fry-input fry-field__item"} id="insurance" name="insurance" type="item" placeholder="$" value={this.state.insuranceAmount}/>
                </div>
              </p>
              <p>
                <div className={"fry-field"}>
                  <label className={"fry-field__label"} for="discounts">Discounts </label>
                  <input className={"fry-input fry-field__item"} id="discounts" name="discounts" type="item" placeholder="$" value={this.state.discounts}/>
                </div>
              </p>
              <p>
                <button onClick={this.handleClick} className="fry-btn fry-btn--secondary fry-btn--large" type="button">Update Settings</button>
              </p>
            </div>
            <div className={"fry-grid__1 fry-grid__1/2@m"}>
              <div className={"fry-box"}>
                <h1>Investment Amount</h1>
                <h1>$3333</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

export default Consultation;