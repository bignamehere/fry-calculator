import React from 'react';
import ReactDOM from 'react-dom';
import './styles/fry-style.scss';
import './index.scss';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
