import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../actions';


class ChatInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			input: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	onChange(event) {
		// Fetch input value
		const input = event.target.value;
		
		// Set input value to state
		this.setState({input});
	}


	onSubmit(event) {
		event.preventDefault();

		// Fetch message input from state
		const userMsg = this.state.input;

		// Pass in message input
		this.props.sendMsg(userMsg);

		// Clear input state so the input field clears as well
		this.setState({
			input: ''
		});

	}


	render() {
		return(
				<div className="message-field">
		          <form className="form-group" onSubmit={this.onSubmit}>
		            <input className="form-control" placeholder="Say something to me ..."
		            	value={this.state.input}
		            	onChange={this.onChange} />

		            <button className="btn btn-primary" onClick={this.onSubmit}>
		              Send
		              <i className="fa fa-send ml-2"></i>
		            </button>
		          </form>
		        </div>
			);
	}
}

export default connect(null, {sendMsg})(ChatInput);