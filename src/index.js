import React from 'react';
import ReactDOM from 'react-dom';
// pull in style from Design System
import './styles/fry-style.scss';
import './index.scss';
import App from './js/App/app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App/>,
    document.getElementById('root'));
registerServiceWorker();
