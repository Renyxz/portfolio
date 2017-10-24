import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchContent } from '../actions';



class BrowsePosts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0
		}
	}


	componentDidMount() {
		// Fetch route params for initial index number 
		// and set to index state 
		const params = this.props.match.params;
		this.setState({index: Number(params.id)});

		// Fetch corresponding content 
		// by inserting current route pathname
		this.props.fetchContent(`/${ params.pathName }`);
	}


	// Render content data
	renderContent() {
		const content = this.props.content;
		const index = this.state.index;


		if(!content) {
			return <div>Loading...</div>;
		}
		
		const post = content[index];
		const techsList = post.techs.map((name) => {
			return(
				<li key={ name }>{ name }</li>
			);
		});


		return(
			<div className="project-wrapper d-flex flex-row">

				<div className="project-detail-wrapper">
					<div>
						<h5>{ post.projectName } - { post.projectDate }</h5>
					</div>
					
					<div>
						<h6>About</h6>
						<p>{ post.description }</p>
					</div>

					<div>
						<h6>Technologies used</h6>
						<ul className="d-flex flex-row">
							{ techsList }
						</ul>
					</div>

					<div className="project-links-wrapper">
						<a href={ post.demoURL }>
							<i className="fa fa-play"></i> Demo
						</a>

						<a href={ post.githubURL }>
							<i className="fa fa-github"></i> Github repo
						</a>
					</div>
				</div>

				<div className="project-video-wrapper">
					<div className="embed-responsive embed-responsive-16by9">
						<iframe className="embed-responsive-item" 
							src={ post.ytURL } title={ post.projectName }
							frameBorder="0" allowFullScreen></iframe>
					</div>
				</div>

			</div>
		);
	}



	// Go to next project
	next() {
		// The number of projects available will determine 
		// when to prevent increasing index number.
		const length = this.props.content.length;

		// Index number will increase
		let index = this.state.index;
		index++;

		// Stop increment when index number reaches the max number of projects
		if(index === length) {
			alert('This is the last one already :)');
			return null;
		}

		// Set current index number to state
		this.setState({ index });
	}


	// Back to previous project
	prev() {
		// Index number will decrease
		let index = this.state.index;
		index--;

		// Stop decrement when index number reaches the the first project
		if(index < 0) {
			alert('This is the first one already :)');
			return null;
		}

		// Set current index number to state
		this.setState({ index });
	}



	render() {
		// For URL iteration purpose
		const index = this.state.index;

		return(
				<div className="page-container row">
					<div className="project-nav-wrapper">
						<a href={ index } onClick={ () => this.prev() }>
							<i className="fa fa-arrow-left"></i> Previous
						</a>

						<a className="float-right" href={ index } onClick={ () => this.next() }>
							Next <i className="fa fa-arrow-right"></i>
						</a>
					</div>

					{ this.renderContent() }
				</div>
			);
	}
}

function mapStateToProps({ content }) {
	return { content };
}

export default connect(mapStateToProps, { fetchContent })(BrowsePosts);