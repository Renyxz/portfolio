import React, { Component } from 'react';
import Chatlog from '../containers/Chatlog';
import ChatInput from '../containers/ChatInput';

class Home extends Component {
	render() {
		return(
				<div className="row">
		          <div className="intro col-lg-12">
		            <h5>Hi, this is Ren the doppelganger.</h5>
		            <p>
		              You can ask me anything about the other Ren who builds apps, <br/>
		              or just chat with me :)
		            </p>
		          </div>  

		          <div className="chat-container">
		            <Chatlog />
		            <ChatInput />
		          </div>

		        </div>
			);
	}
}

export default Home;