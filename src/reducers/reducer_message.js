import { BOT_MSG } from '../actions'

export default function(state=null, action) {
	switch(action.type) {
		// case USER_MSG:
			// return action.payload;

		case BOT_MSG:
			return action.payload;

		default:
			return state;
	}
}