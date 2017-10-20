import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './css/index.css';
import './css/App.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// React-Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

// Reducer
import Reducers from './reducers';

// Create store with middleware
const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk)(createStore));


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(Reducers)} >
		<BrowserRouter>
			<Switch>
				<Route path="/" component={App} />
			</Switch>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
