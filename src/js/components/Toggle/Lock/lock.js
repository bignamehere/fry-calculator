//
//
import React, { Component } from 'react';
import './lock.scss';

class Lock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: false
    }
    this.onToggle = this.onToggle.bind(this);
    this.setToggle = this.setToggle.bind(this);
  }

  onToggle(e){
    let v = !this.state.locked;
    this.setToggle( v );
    if (this.props.onToggle) this.props.onToggle( {id: this.props.lockId, value: v} );
  }

  setToggle(v){
    // this is stupid ugly... refactor soon!!
    console.log(this.props.lockId + " locked? " + v)
    if(!v){
      document.getElementById(this.props.lockId)
        .getElementsByClassName('lock-locked')[0]
        .classList.remove('lock-icon-show')
      document.getElementById(this.props.lockId)
        .getElementsByClassName('lock-locked')[0]
        .classList.add('lock-icon-hide');
      document.getElementById(this.props.lockId)
        .getElementsByClassName('lock-unlocked')[0]
        .classList.remove('lock-icon-hide')
      document.getElementById(this.props.lockId)
        .getElementsByClassName('lock-unlocked')[0]
        .classList.add('lock-icon-show');
    } else {
      document.getElementById(this.props.lockId)
        .getElementsByClassName('lock-locked')[0]
        .classList.remove('lock-icon-hide')
      document.getElementById(this.props.lockId)
        .getElementsByClassName('lock-locked')[0]
        .classList.add('lock-icon-show');
      document.getElementById(this.props.lockId)
        .getElementsByClassName('lock-unlocked')[0]
        .classList.remove('lock-icon-show')
      document.getElementById(this.props.lockId)
        .getElementsByClassName('lock-unlocked')[0]
        .classList.add('lock-icon-hide');
    }

    this.setState({ locked: v });

  }
  //4d868e Fry Green
  //4e4084 Fry Purple

  //44367a // light green
  //8072b6 light purple
  //#619aa2
  render(){
    return (
      <div id={this.props.lockId} className="lock" onClick={this.onToggle}>
        <div className="lock-locked lock-icon-hide">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#003865"
              d="M14 9v2h-4v-2c0-1.104.897-2 2-2s2 .896 2 2zm10 3c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-8-1h-1v-2c0-1.656-1.343-3-3-3s-3 1.344-3 3v2h-1v6h8v-6z"
            />
          </svg>
        </div>
        <div className="lock-unlocked lock-icon-show">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="#4a80b5"
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-8v-6h2v-2c0-1.103-.897-2-2-2s-2 .897-2 2v1h-1v-1c0-1.656 1.343-3 3-3s3 1.344 3 3v2h5v6z"
            />
          </svg>
        </div>
      </div>
    );
  }
}
export default Lock;