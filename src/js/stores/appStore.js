// author: bignamehere
//
import { createStore } from 'redux';
import AppReducer from '../reducers/AppReducer/appReducer';


class Store {
    constructor (initialState) {
      this.state = initialState;
      this.appReducer = AppReducer;
      this.initialState = initialState;
      this.listeners = [];
    }
  
    setState (state) {
      this.state = state;
      for (const listener of this.listeners){
        listener(state);
      }
    }
  
    getState () {
      return this.state;
    }

    addListener (listener){
      this.listeners.push(listener);
    }
  }
  
  const AppStore = new Store({});
  export default AppStore;