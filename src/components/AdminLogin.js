import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminLogin } from '../actions';



class AdminLogin extends Component {

	// Handle email login
	handleLogin() {
		const email = this.refs.email.value;
		const password = this.refs.password.value;

		this.props.adminLogin(email, password);
	}



	render() {
		return(
				<div className="page-container row">
					<form className="login-form form-group">
						<label>Please login to post and edit content :)</label>
						<input className="form-control" ref="email" placeholder="Email" type="email" />
						<input className="form-control" ref="password" placeholder="Password" type="password" />
						<button className="btn btn-primary form-control" type="button" onClick={ () => this.handleLogin() } >Login</button>
					</form>
				</div>
			);
	}
}


export default connect(null, { adminLogin })(AdminLogin);