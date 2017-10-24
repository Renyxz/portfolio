import React, { Component } from 'react';
import Chatlog from '../containers/Chatlog';
import ChatInput from '../containers/ChatInput';

class Home extends Component {
	render() {
		return(
				<div className="page-container row">
		          <div className="intro col-lg-12">
		            <h5>Hi, this is Ren the Doppelgänger.</h5>
		            <p>
		              You can ask me anything about the other <b>Ren who builds apps</b>, <br/>
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