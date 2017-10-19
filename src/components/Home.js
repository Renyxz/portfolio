import React, { Component } from 'react';


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
		            <div className="chat-box">
		              Will Render chat msgs...
		            </div>

		            <div className="message-field">
		              <form className="form-group">
		                <input className="form-control" placeholder="Say something to me ..."/>
		                <button className="btn btn-primary">
		                  Send
		                  <i className="fa fa-send ml-2"></i>
		                </button>
		              </form>
		            </div>
		          </div>

		        </div>
			);
	}
}

export default Home;