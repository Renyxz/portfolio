import { combineReducers } from 'redux';
import testReducer from './reducer_test'

const rootReducer = combineReducers({
	data: testReducer
});

export default rootReducer;