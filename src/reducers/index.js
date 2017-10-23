import { combineReducers } from 'redux';
import messageReducer from './reducer_message';
import postFormReducer from './reducer_create_post_form';

const rootReducer = combineReducers({
	message: messageReducer,
	categories: postFormReducer
});

export default rootReducer;