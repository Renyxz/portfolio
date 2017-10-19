import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './css/index.css';
import './css/App.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" component={App} />
		</Switch>
	</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();
