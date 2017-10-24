import { combineReducers } from 'redux';
import messageReducer from './reducer_message';
import postFormReducer from './reducer_create_post_form';
import contentReducer from './reducer_content';


const rootReducer = combineReducers({
	message: messageReducer,
	categories: postFormReducer,
	content: contentReducer
});

export default rootReducer;