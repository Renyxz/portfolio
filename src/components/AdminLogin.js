import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminLogin } from '../actions';



class AdminLogin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	// On input changes
	onChange() {
		const email = this.refs.email.value;
		const password = this.refs.password.value;
		
		this.setState({
			email,
			password
		});
	}

	// Handle email login
	onSubmit() {

		const email = this.state.email;
		const password = this.state.password;

		this.props.adminLogin(email, password);
	}



	render() {
		return(
				<div className="page-container row">
					<form className="login-form form-group" onSubmit={ this.onSubmit }>
						<label>Please login to post and edit content :)</label>
						<input className="form-control" ref="email" placeholder="Email" type="text"
							onChange={ this.onChange } />

						<input className="form-control" ref="password" placeholder="Password" type="password"
							onChange={ this.onChange } />

						<button className="btn btn-primary form-control" type="button" onClick={ () => this.onSubmit() } >Login</button>
					</form>
				</div>
			);
	}
}


export default connect(null, { adminLogin })(AdminLogin);