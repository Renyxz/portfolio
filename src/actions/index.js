import * as firebase from 'firebase';
import { ApiAiClient } from 'api-ai-javascript';
import history from '../js/History';


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAe6jDawNveh-wSwN7X-bV8PIX29hJmUdc",
    authDomain: "portfolio-33292.firebaseapp.com",
    databaseURL: "https://portfolio-33292.firebaseio.com",
    projectId: "portfolio-33292",
    storageBucket: "portfolio-33292.appspot.com",
    messagingSenderId: "115217271624"
  };
  firebase.initializeApp(config);

const auth = firebase.auth();


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



// Admin
// Google sign in
export function adminLogin(email, password) {
	const promise = auth.signInWithEmailAndPassword(email, password);

	return dispatch => {
		promise.then((result) => {
			const userName = result.email;
			alert(`Welcome back, ${userName}!`);

			// console.log(result);
			window.localStorage.setItem('user', userName);

			window.location.reload();
			history.push('/dashboard');
		});

		promise.catch((error) => {
			alert(error.message);
		});
	}
}


// Logout
export function logout() {
	const promise = auth.signOut();

	return dispatch => {
		promise.then(() => {
			alert('See you later :)');

			window.localStorage.removeItem('user');

			window.location.reload();
		});

		promise.catch((error) => {
			alert(error.message);
		});
	}
}