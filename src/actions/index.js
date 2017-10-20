import { ApiAiClient } from 'api-ai-javascript';

// Api.ai Initialization
const ACCESS_TOKEN = '74eb689aa6d4443d86288a088163e6bd';
const client = new ApiAiClient({accessToken: ACCESS_TOKEN});

// Payload constables
export const USER_MSG = 'user_msg';
export const BOT_MSG = 'bot_msg';




// // Messages from user
// export function userChatAction(userMsg) {
// 	return {
// 		type: USER_MSG,
// 		payload: userMsg
// 	};
// }

// Messages from bot
export function botChatAction(botMsg) {
	return {
		type: BOT_MSG,
		payload: botMsg
	};
}


export function sendMsg(userMsg) {
	const promise = client.textRequest(userMsg);

	return dispatch => {
		// Success
	    promise.then((response) => {
	    	// In case response is not ready yet:
	    	if(!response) {
	    		console.log('Thinking...');
	    	}

	    	// Fetch message from bot
	    	const botMsg = response.result.fulfillment.speech;

	    	// Dispatch user & bot messages to their action creators
	    	dispatch(botChatAction(botMsg));
	    	// dispatch(userChatAction(userMsg));

	    	console.log(botMsg);	
	    });
	    
	    // Fail
	    promise.catch((error) => {
	    	console.log(error);
	    });
	}
}
