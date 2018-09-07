//
//
import React, { Component } from 'react';
import FryKnob from '../../components/Knob/knob';
import Totals from '../../components/displays/Totals/totals';
import Consultation from '../Consultation/consultation';
import Lock from '../../components/Toggle/Lock/lock';
import Modal from 'react-responsive-modal';
import Disclaimer from '../../components/Disclaimer/disclaimer';
import logo from '../../../img/fry-logo-w.png';
import './payment.scss';


const API_URL = 'api/data.json';

class Payment extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      dpKnobLocked: false,
      mpKnobLocked: false,
      mKnobLocked: false,
      showDiscount: true
    };

    this.onDownPaymentChange = this.onDownPaymentChange.bind(this);
    this.onMonthlyPaymentsChange = this.onMonthlyPaymentsChange.bind(this);
    this.onMonthsChange = this.onMonthsChange.bind(this);
    this.onInvestmentChange = this.onInvestmentChange.bind(this);
    this.recalculateTotals = this.recalculateTotals.bind(this);
    this.setKnobLock = this.setKnobLock.bind(this);
    this.setKnobState = this.setKnobState.bind(this);
  }

  componentWillMount(){
    fetch(API_URL)
      .then(response => response.json())
      .then( data => this.initAppData(data) )
      .catch(function(error) {
        console.log(error);
      });  
  }

  initAppData(data){
    // manipulate the value if using value from Consultation Screen

    this.setState({
      investment: this.props.investment,
      downpayment: data.DownPaymentKnobSettings.initial_value,
      payments: data.MonthlyPaymentsKnobSettings.initial_value,
      months: data.MonthsKnobSettings.initial_value,
      maxDownPayment: this.props.investment,
      maxPayments: data.MonthlyPaymentsKnobSettings.value_max,
      maxMonths: data.MonthsKnobSettings.value_max,
      minDownPayment: data.DownPaymentKnobSettings.value_min,
      minPayments: data.MonthlyPaymentsKnobSettings.value_min,
      minMonths: data.MonthsKnobSettings.value_min,
		  dpkRoundNumber: data.DownPaymentKnobSettings.roundNumber,
		  mpkRoundNumber: data.MonthlyPaymentsKnobSettings.roundNumber,
      mkRoundNumber: data.MonthsKnobSettings.roundNumber,
      zeroMonthsDownPaymentMin: data.DownPaymentKnobSettings.zeroMonthsDownPaymentMin,
      zeroDownPaymentMonthsMax: data.MonthsKnobSettings.zeroDownPaymentMonthsMax
    });

    this.setKnobState(
      data.DownPaymentKnobSettings,
      data.MonthlyPaymentsKnobSettings,
      data.MonthsKnobSettings,
      this.props.investment
    );

    this.refs.dpKnob.dataLoaded();
    this.refs.mpKnob.dataLoaded();
    this.refs.mKnob.dataLoaded();

    // SET INITIAL STATE OF KNOBS
    this.recalculateTotals("total", this.props.investment);
  }

  onDownPaymentChange(amount){
    this.recalculateTotals("dp", amount);
  }

  onMonthlyPaymentsChange(amount){
    this.recalculateTotals("mp", amount);
  }

  onMonthsChange(amount){
    this.recalculateTotals("m", amount);
  }

  onInvestmentChange(amount){

//
// this is NOT DRY... new to refactor
//

    let newAmount = amount;// == undefined ? this.props.investment : amount;
    let tempDPObj = this.state.DownPaymentKnobSettings;
    let tempMPObj = this.state.MonthlyPaymentsKnobSettings;
    
    if(this.state.investment !== newAmount){
      this.setState({
        investment: newAmount,
        showDiscount: true
      });
    }

    tempDPObj.value_max = this.roundUp(this.state.DownPaymentKnobSettings.roundNumber, newAmount);
    tempMPObj.value_max = this.roundUp(
      tempMPObj.roundNumber,
      Math.round( newAmount / this.state.MonthsKnobSettings.value_min )
    );

    /*
    this.refs.dpKnob.resetKnobSettings(tempDPObj);
    this.refs.mpKnob.resetKnobSettings(tempMPObj);
    this.refs.mKnob.resetKnobSettings(this.state.MonthsKnobSettings);
    */
   
    this.setKnobState(
      tempDPObj,
      tempMPObj,
      this.state.MonthsKnobSettings,
      newAmount
    );

    this.recalculateTotals("total", amount);
  }

  ///
  ///
  ///

  recalculateTotals(who, amount){
    // do things here to manipulate view

    let skip = false;
    //
    let amountOwed = 0;
    let dp = this.state.downpayment;
    let mp = this.state.payments;
    let m = this.state.months;
    let investment = this.props.investment;
    //
    let zeroMDPMin = this.state.zeroMonthsDownPaymentMin;
    let zeroDPMMax = this.state.zeroDownPaymentMonthsMax;
    //
    let maxDownPayment = this.props.investment;
    let maxPayments = this.state.maxPayments;
    let maxMonths = this.state.maxMonths;
    //
    let minDownPayment = this.state.minDownPayment;
    let minPayments = this.state.minPayments;
    let minMonths = this.state.minMonths;
    //
    let dpLocked = this.state.dpKnobLocked;
    let mpLocked = this.state.mpKnobLocked;
    let mLocked = this.state.mKnobLocked;

    switch( who ){
      case "dp":

        if( dpLocked || amount < minDownPayment || amount > maxDownPayment ){

          //if(dp >= maxDownPayment) 
          dp = maxDownPayment;
          this.showDiscountPopup();
          skip = true;
        } else {
          
          dp = amount;
          amountOwed = investment - dp;

          if( dp < maxDownPayment){

            // set Monthly Payments if able
            if( !mpLocked && mp >= minPayments && mp <= maxPayments ){
              mp = Math.round(amountOwed / m);
            // set Months if Monthly payment fails and Months able   
            } else if( !mLocked && m >= minMonths && m <= maxMonths ) {
              m = Math.round( (amountOwed / mp) );
              
              // Reset Months - out of range High
              if(m >= maxMonths){
                m = maxMonths;
                //dp = dp > this.state.downpayment ? dp : this.state.downpayment;
              }
              // Reset Months - out of range Low
              if(m <= minMonths){
                m = minMonths;
                //dp = dp < this.state.downpayment ? dp : this.state.downpayment;
              }

            } 
            // reset amount owed based on new data
            amountOwed = investment - dp;
          } else {
            // set other dials to minimums and show popup
            mp = minPayments;
            m = minMonths;
            dp = maxDownPayment;
            //if(dp != this.state.downpayment) 
            this.showDiscountPopup();
          }
        }

        break;

      case "mp":

        if( mpLocked || amount < minPayments || amount > maxPayments ){
          skip = true;
        } else {
          
          mp = amount;
          amountOwed = investment - dp;

          if( mp < maxPayments){
            
            if( !mLocked && m >= minMonths && m <= maxMonths ) {
              m = Math.round( (amountOwed / mp) );
              
              if(m >= maxMonths){
                m = maxMonths;
                mp = mp > this.state.payments ? mp : this.state.payments;
              }
              if(m <= minMonths){
                m = minMonths;
                mp = mp < this.state.payments ? mp : this.state.payments;
              }

            } else {

              if( !dpLocked && dp >= minDownPayment && dp <= maxDownPayment ) {
                dp = Math.round(investment - (mp * m));
              }else if(amount < this.state.payments){
                mp = amount;
                dp = Math.round(investment - (mp * m));
              }else{
                mp = this.state.payments;
              }

            }
          } else {
            dp = minDownPayment;
            m = minMonths;
          }
        }
        if(dp >= maxDownPayment) this.showDiscountPopup();

        break;

      case "m":

        if( mLocked || amount < minMonths || amount > maxMonths ){
          skip = true;
        } else {
          
          m = amount;
          amountOwed = investment - dp;

          if( !mpLocked && mp >= minPayments && mp <= maxPayments ){
            mp = Math.round(amountOwed / m);
          }

          if( !dpLocked && m >= minDownPayment && m <= maxDownPayment ) {
            dp = Math.round( investment - (mp * m) );
          }

        }

        break;
      
      case "total":
        this.setState({ investment: amount });
        amountOwed = amount - dp;
        mp = Math.round(amountOwed / m);
        break;

      default:
        amountOwed = 0;
        mp = 0;
        break;
    }
    
    if(!skip){
      let totalsObject = {
        downpayment: dp,
        payments: mp,
        months: m,
        amountOwed: amountOwed
      };
      this.setState( totalsObject );
      this.setValues( totalsObject );
    }
  } 

  roundUp(r,v){
  	return Math.ceil(v / r) * r;
  }

  ///
  ///
  ///
  ///

  setValues( data ){
    console.log("setValues");
    // Set values of individual Knobs
    this.refs.dpKnob.setKnobValue( data.downpayment );
    this.refs.mpKnob.setKnobValue( data.payments );
    this.refs.mKnob.setKnobValue( data.months );
    // Set values of Totals Display
    this.refs.display.setValues( data );
  }

  setKnobState(dpKnobData, mpKnobData, mKnobData, amount){

    dpKnobData.value_max = this.roundUp(dpKnobData.roundNumber, amount);
    
    mpKnobData.value_max = this.roundUp(
      mpKnobData.roundNumber,
      Math.round( amount / mKnobData.value_min )
    );

    this.setState({
      DownPaymentKnobSettings: dpKnobData,
      MonthlyPaymentsKnobSettings: mpKnobData,
      MonthsKnobSettings: mKnobData
    });

    
  }

  setKnobLock(e){
    // do things here to lock the knob
    let boo = e.value;// ? false : true;
    switch (e.id){
      case "dp":
        this.refs.dpKnob.setKnobLock( boo );
        this.setState({ dpKnobLocked: boo});
        //
        this.refs.mpKnob.setKnobLock( false );
        this.refs.mpLock.setToggle(false);
        //
        this.refs.mKnob.setKnobLock( false );
        this.refs.mLock.setToggle(false);
        //
        this.setState({ mpKnobLocked: false});
        this.setState({ mKnobLocked: false});
        break;
      case "mp":
        this.refs.mpKnob.setKnobLock( boo );
        this.setState({ mpKnobLocked: boo});

        this.refs.dpKnob.setKnobLock( false );
        this.refs.dpLock.setToggle(false);
        //
        this.refs.mKnob.setKnobLock( false );
        this.refs.mLock.setToggle(false);
        //
        this.setState({ dpKnobLocked: false});
        this.setState({ mKnobLocked: false});
        
        break;
      case "m":
        this.refs.mKnob.setKnobLock( boo );
        this.setState({ mKnobLocked: boo});
        //
        this.refs.dpKnob.setKnobLock( false );
        this.refs.dpLock.setToggle(false);
        //
        this.refs.mpKnob.setKnobLock( false );
        this.refs.mpLock.setToggle(false);
        //
        this.setState({ dpKnobLocked: false});
        this.setState({ mpKnobLocked: false});
        
        break;
      default:
        break;
    }

  }

  showDiscountPopup(){
    if(this.state.showDiscount){
      this.onOpenModal();
      //this.setState({showDiscount:false});
    }
  }

  onOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

	render() {
    const { modalOpen } = this.state;
    return (
      <div>
          
          <Modal
            open={this.state.modalOpen}
            onClose={this.onCloseModal}
            little
            classNames={{
              modal: 'modal-custom',
              closeIcon: 'modal-custom-close'
            }}>

            <h2 className="modal-custom__header">Pay In Full Discount - 10% Off!</h2>
            <p className="modal-custom__content">
              At Fry Orthodontic Specialists, when you pay the full amount for your braces, you will receive a <strong>10% discount</strong> on your investment.
            </p>
            <div className="fry-grid">
              <div className="fry-grid__1/1 fry-grid__auto@m">
                <h1 className="modal-custom__content-centered">Price: ${this.props.investment - Math.round(this.props.investment*.1)}</h1>
              </div>
              <div className="fry-grid__1/1 fry-grid__1/4@m modal-custom__logo">
                <img src={logo} className="logo" alt="Fry Orthodontics Logo" />
              </div>
            </div>
          
          </Modal>
          
          <div className="fry-grid app-knob-container">

            <div className="fry-grid__1/1 fry-grid__1/12@m"></div>

            <div className="fry-grid__1/1 fry-grid__3/12@m">
              <div className="knob-container">

                <FryKnob ref="dpKnob"
                  roundNumber={ this.state.dpkRoundNumber }
                  settings={ this.state.DownPaymentKnobSettings }
                  onChange={ this.onDownPaymentChange }
                />

                <div className="lock-toggle">
                  <div className="lock-toggle-lock__sm">
                  <div className="lock-container__sm">
                      <Lock
                        className="knob-lock"
                        ref="dpLock"
                        onToggle={this.setKnobLock}
                        lockId="dp"
                      />
                    </div>
                  </div>
                  <div className="lock-toggle__text-sm">
                    <span className="">Down Payment</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="fry-grid__1/1 fry-grid__4/12@m">
              <div className="knob-container">

                <FryKnob ref="mpKnob"
                  roundNumber={ this.state.mpkRoundNumber }
                  settings={ this.state.MonthlyPaymentsKnobSettings }
                  onChange={ this.onMonthlyPaymentsChange }
                />

                <div className="lock-toggle">
                  <div className="lock-toggle-lock__lg">
                    <div className="lock-container__lg">
                      <Lock
                        className="knob-lock"
                        ref="mpLock"
                        onToggle={this.setKnobLock}
                        lockId="mp"
                      />
                    </div>
                  </div>
                  <div className="lock-toggle__text-lg">
                    <span className="">Monthly Payment</span>
                  </div>
                </div>

              </div>
            </div>
            <div className="fry-grid__1/1 fry-grid__3/12@m">
              <div className="knob-container">
              
                <FryKnob ref="mKnob"
                  roundNumber={ this.state.mkRoundNumber }
                  settings={ this.state.MonthsKnobSettings }
                  onChange={ this.onMonthsChange }
                />

                <div className="lock-toggle">
                  <div className="lock-toggle-lock__sm">
                    <div className="lock-container__sm">
                      <Lock
                        className="knob-lock"
                        ref="mLock"
                        onToggle={this.setKnobLock}
                        lockId="m"
                      />
                    </div>
                  </div>
                  <div className="lock-toggle__text-sm">
                    <span className="">Months</span>
                  </div>
                </div>

              </div>
            </div>

          <div className="fry-grid__1/1 fry-grid__1/12@m"></div>
          
          <div className="fry-grid__1/1">
            <Totals ref="display"/>
          </div>
          <div className="fry-grid__1/1">
            <Disclaimer />
          </div>
        </div>
      </div>

		);
	}
}

export default Payment;