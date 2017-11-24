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
const database = firebase.database();


// Api.ai Initialization
const ACCESS_TOKEN = '74eb689aa6d4443d86288a088163e6bd';
const client = new ApiAiClient({accessToken: ACCESS_TOKEN});

// Api.ai payload constables
export const BOT_MSG = 'bot_msg';


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

	    	// Fetch message from bot
	    	const botMsg = response.result.fulfillment.speech;

	    	// Dispatch user & bot messages to their action creators
	    	dispatch(botChatAction(botMsg));

	    	// console.log(botMsg);	
	    });
	    
	    // Fail
	    promise.catch((error) => {
	    	console.log(error);
	    });
	}
}



// Firebase 

// Firebase payload constables
export const FETCH_CONTENT = 'fetch_content';

// Read from database 

// Action - projects
export function fetchContentAction(content) {
	return {
		type: FETCH_CONTENT,
		payload: content
	}
}



// Dispatch data from firebase database

// Content
export function fetchContent(category, projectId) {
	// Fetch data
	const promise = database.ref('content').once('value');
	
	return dispatch => {
		promise.then((snapshot) => {
			const data = snapshot.val();
			let content;

			// If no data is available
			if(!data) {
				return null;
			}


			// If category is null
			if(!category) {
				
				content = data;
				
			} else {
				// Filter data for Ongoing posts
				const list = Object.keys(data).map((project) => {
					const post = data[project];
					const date = post.projectDate;
					let ongoing, past;
	
					(date === 'ongoing') ? ongoing = post : past = post;
	
					return (category === '/ongoing') ? ongoing 
					: (category === '/past') ? past
					: post;
				});
	
				// console.log(list);
	
				// Create a new array of objects without undefined projects
				content = [];
				for(let i = 0; i < list.length; i++) {
					if(list[i] === undefined) {
						continue;
					}
					content.push(list[i]);
				}
			}
			
			
			dispatch(fetchContentAction(content));

			// console.log(content);


		});
			
			// Hide nav 
			const nav = document.getElementById('nav');
			nav.style.height = '0%';
	}
}




// Write to database
export function postContent(postData) {
	const uid = auth.currentUser.uid;

	// Write to 'content' -> 'key'
	const newPostKey = database.ref().push().key;

	// Add post key to post data
	const post = Object.assign({}, postData, { projectId: newPostKey });
	
	// Write post date to post list & user post list
	let updates = {};

		updates[`content/${newPostKey}`] = post;
		updates[`${uid}/content/${newPostKey}`] = post;


	return dispatch => {

		const promise = database.ref().update(updates);
		
		// Success
		promise.then(() => {
			alert('A new post has been created!');

			// Back to dashboard
			window.location.reload();
			history.push('/dashboard');
		});

		// Fail
		promise.catch((error) => {
			console.log(error.message);
		});
	}
}



// Update content
export function updateContent(postData, projectId) {
	const uid = auth.currentUser.uid;
	const promiseUser = database.ref(`${uid}/content/${projectId}`);
	const promisePublic = database.ref(`content/${projectId}`);

	return dispatch => {
		let data = {};
		
		Object.keys(postData).forEach( key => {
			const input = postData[key];
			if(input !== '' && input.length !== 0) {
				data[ key ] = input;
			}

		});

		promiseUser.update(data).then(() => {
			window.location.reload();
			history.push('/dashboard/posts');
		});

		promisePublic.update(data);

	}
}



// Delete content
export function deletePost(projectId) {
	const uid = auth.currentUser.uid;

	// Remove post from database 
	// User
	const promiseUser = database.ref(`${uid}/content`).child(`${projectId}`).remove();
	
	// Public 
	database.ref(`content`).child(`${projectId}`).remove();
	
	return dispatch => {
		// Successful removal
		promiseUser.then(() => {
			alert('Post has been deleted!');

			window.location.reload();
		});

		// Failed removal
		promiseUser.catch((error) => {
			console.log(error.message);
		});
	}

}



// Admin
// Email sign in with firebase
export function adminLogin(email, password) {
	const promise = auth.signInWithEmailAndPassword(email, password);

	return dispatch => {
		promise.then((result) => {
			const userName = result.email;
			alert(`Welcome back, ${userName}!`);

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


