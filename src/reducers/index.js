import { combineReducers } from 'redux';
import messageReducer from './reducer_message';

const rootReducer = combineReducers({
	message: messageReducer
});

export default rootReducer;