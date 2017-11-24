import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateContent } from '../actions';



// For both creating & updating post
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
			techs: [],
			pathName: '',
			thumbnail: '',
			projectId: ''
		}
		this.addTech = this.addTech.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

	}



	componentDidMount() {
		const projectId = this.props.match.params.projectId;

		this.setState({
			projectId
		});

		// console.log();
	}


	// Submit form data
	onSubmit() {
		const projectId = this.state.projectId;

		// Fetch data from states
		const projectName = this.state.name;
		const projectDate = this.state.date;
		const demoURL = this.state.demoURL;
		const ytURL = this.state.ytURL;
		const githubURL = this.state.githubURL;
		const techs = this.state.techs;
		const description = this.state.description;
		const thumbnail = this.state.thumbnail;

		const postData = {
			projectName, 
			projectDate, 
			demoURL, 
			ytURL, 
			githubURL, 
			techs, 
			description,
			thumbnail
		};
		
		// Update selected post
		this.props.updateContent(postData, projectId);

	}


	// Set data to states
	onChange() {
		const name = this.refs.name.value;
		const date = this.refs.date.value;
		const demoURL = this.refs.demoURL.value;
		const ytURL = this.refs.ytURL.value;
		const githubURL = this.refs.githubURL.value;
		const description = this.refs.description.value;
		const thumbnail = this.refs.thumbnail.value;

		this.setState({
			name, 
			date,
			demoURL,
			ytURL,
			githubURL,
			description,
			thumbnail
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
		if(event.keyCode === 13 && input.length > 3 && this.state.techs.length < 5) {
			// Pushes each technology name to a state
			this.setState({
				techs: this.state.techs.concat(input)
			});

			// Clears input field
			event.target.value = '';
		}

		if(this.state.techs.length === 5 && event.keyCode === 13) {
			alert('Stop hoarding technologies into your post...');
			event.target.value = '';
			return null;
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
			return (<small className="mr-2" key={ name }>{ name }</small>);
		});

		// console.log();

		return(
				<div className="page-container row">
					<form className="post-form form-group">

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
										<div className="tech-list-wrapper">
											<ul className="d-flex flex-row">
												{ techList }
											</ul>
										</div>
									
								</div>

								<div className="project-des-wrapper">
									<label>Project description</label>
									<textarea className="form-control" ref="description" placeholder="What is the purpose of this project?"
										onChange={ this.onChange } />
								</div>
							

								<div className="post-btns-wrapper">
									<div className="float-right">

										<button type="button"
											onClick={ this.onSubmit }>Update post</button>
										
										<Link className="cancel-btn" to="/dashboard">Cancel</Link>
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


export default connect(mapStateToProps, { updateContent })(CreatePost);