import { BOT_MSG } from '../actions'

export default function(state=null, action) {
	switch(action.type) {
		case BOT_MSG:
			return action.payload;

		default:
			return state;
	}
}