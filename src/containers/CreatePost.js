import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postContent } from '../actions';


// TODO:
// Add function for writing data into firebase database

class CreatePost extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			date: '',
			demoURL: '',
			ytURL: '',
			githubURL: '',
			description: '',
			techs: []
		}
		this.addTech = this.addTech.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}


	// Submit form data
	onSubmit() {
		// Fetch data from states
		const name = this.state.name;
		const date = this.state.date;
		const demoURL = this.state.demoURL;
		const ytURL = this.state.ytURL;
		const githubURL = this.state.githubURL;
		const techs = this.state.techs;
		const description = this.state.description;

		// submit data to postContent function
		this.props.postContent(name, date, demoURL, ytURL, githubURL, techs, description);
	}


	// Set data to states
	onChange() {
		const name = this.refs.name.value;
		const date = this.refs.date.value;
		const demoURL = this.refs.demoURL.value;
		const ytURL = this.refs.ytURL.value;
		const githubURL = this.refs.githubURL.value;
		const description = this.refs.description.value;

		this.setState({
			name, 
			date,
			demoURL,
			ytURL,
			githubURL,
			description
		});
	}


	// Adds names of technologies used
	addTech(event) {
		// Fetch techs value from input field
		const input = event.target.value;

		// Error message
		if(event.keyCode=== 13 && input.length <= 3) {
			alert('Please enter something more than 3 characters long.');
		}

		// Success
		if(event.keyCode === 13 && input.length > 3) {
			// Pushes each technology name to a state
			this.setState({
				techs: this.state.techs.concat(input)
			});

			// Clears input field
			event.target.value = '';
		}

	}


	// Renders input list from create post form reducer
	renderInputFields() {

		const data = this.props.categories.inputs;

		const inputList = Object.keys(data).map((list, id) => {
			const label = data[list].label;
			const placeholder = data[list].placeholder;
			const ref = data[list].ref;

			return (
					<li key={ label }>
						<label>{ label }</label>
						<input className="form-control" ref={ ref } placeholder={ placeholder }
							onChange={ this.onChange } />
					</li>
				);
		});

		return inputList;
	}




	render() {
		const list = this.state.techs;

		const techList = (!list) ? null 
		: list.map((name) => {
			return (<li className="mr-2" key={ name }>{ name }</li>);
		});

		// console.log();

		return(
				<div className="page-container row">
					<form className="create-post-form form-group">

						<div className="input-techs-container d-flex flex-row">
							<div className="cp-form-left">
								<ul className="inputs-wrapper">
									{ this.renderInputFields() }
								</ul>
							</div>

							<div className="cp-form-right">
								<div className="techs-wrapper">
									<label>Technologies used</label>
										<input className="form-control" placeholder="Hit enter to add technologies used."
											onKeyDown={ this.addTech } />
										<ul className="tech-list-wrapper d-flex flex-row">
											{ techList }
										</ul>
									
								</div>

								<div className="project-des-wrapper">
									<label>Project description</label>
									<textarea className="form-control" ref="description" placeholder="What is the purpose of this project?"
										onChange={ this.onChange } />
								</div>
							

								<div className="create-post-btns-wrapper">
									<div className="float-right">
										<button className="btn btn-primary" type="button"
											onClick={ this.onSubmit }>Create post</button>
										<Link className="btn btn-danger" to="/dashboard">Cancel</Link>
									</div>
								</div>
							</div>
						</div>

					</form>
				</div>
			);
	}
}


function mapStateToProps({ categories }) {
	return { categories };
}


export default connect(mapStateToProps, { postContent })(CreatePost);