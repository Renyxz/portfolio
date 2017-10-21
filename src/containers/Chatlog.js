import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chatlog extends Component {

	renderData() {
		const message = this.props.message;
		// console.log(message);
		
		// If message is null
		if(!message) {
			return(
					<div className="idle-msg-wrapper">
						<p>Waiting for you to say something...</p>
					</div>
				);
		}

		return(
				<div className="msg-wrapper">
					<p>
						" {message} "
					</p>
				</div>
			);
	}



	render() {
		return(
				<div className="chat-box">
		        	{ this.renderData() }
		        </div>
			);
	}
}

function mapStateToProps({message}) {
	return { message };
}

export default connect(mapStateToProps)(Chatlog);