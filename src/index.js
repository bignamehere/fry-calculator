import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App/app';
import registerServiceWorker from './registerServiceWorker';
// Styles
import './styles/card-style.scss';
import './index.scss';


ReactDOM.render(
    <App />,
  document.getElementById('root'));
registerServiceWorker();
