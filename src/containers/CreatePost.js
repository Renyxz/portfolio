import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


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
			techs: []
		}
		this.addTech = this.addTech.bind(this);
		this.onChange = this.onChange.bind(this);
	}


	onChange() {
		const name = this.refs.name.value;
		const date = this.refs.date.value;
		const demoURL = this.refs.demoURL.value;
		const ytURL = this.refs.ytURL.value;
		const githubURL = this.refs.githubURL.value;

		this.setState({
			name, 
			date,
			demoURL,
			ytURL,
			githubURL
		});
	}



	addTech(event) {
		// Fetch techs used input value from state
		const input = event.target.value;

		if(event.keyCode=== 13 && input.length <= 3) {
			alert('Please enter something more than 3 characters long.');
		}

		if(event.keyCode === 13 && input.length > 3) {
			this.setState({
				techs: this.state.techs.concat(input)
			});

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
									<textarea className="form-control" placeholder="What is the purpose of this project?" />
								</div>
							

								<div className="create-post-btns-wrapper">
									<div className="float-right">
										<button className="btn btn-primary" type="button">Create post</button>
										<Link className="btn btn-danger" to="/">Cancel</Link>
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


export default connect(mapStateToProps)(CreatePost);