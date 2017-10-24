import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchContent } from '../actions';

class ProjectList extends Component {


	componentDidMount() {
		const pathName = this.props.history.location.pathname;
		this.props.fetchContent(pathName);

		console.log(pathName);
	}


	// Project list
	renderProjectList() {
		const content = this.props.content;

		// If content is undefined / null
		if(!content) {
			return(
					<div className="loading-wrapper">
						<div>
							Looks like master has not posted anything yet...
						</div>
					</div>
				);
		}
	

		


		// Render project list
		const pathName = this.props.history.location.pathname;
		const dateClassName = (pathName === '/ongoing') ? 'hide' : '';

		const projectList = content.map((project, id) => {
			const projectName = project.projectName;
			const projectDate = project.projectDate;
			return(
					<Link to={`${pathName}/${id}`} className="d-flex flex-row"
						key={ projectName }>
						<h5>{ projectName }</h5>
						<p className={ dateClassName }>[ { projectDate } ]</p>
					</Link>
				);
		});
		

		// Change layout according to number of projects available
		let className;

		// If projects > 10
		(content.length < 10) ? className = 'list-wrapper center' 
		: className = 'list-wrapper';


		// console.log(projectList);
		return(
				<ul className={ className }>
					{ projectList }
				</ul>
			);
	}




	render() {
		return(
				<div className="page-container row">
					<div className="project-list-container">
						{ this.renderProjectList() }
					</div>
				</div>
			);
	}

}


function mapStateToProps({ content }) {
	return { content };
}

export default connect(mapStateToProps, { fetchContent })(ProjectList);