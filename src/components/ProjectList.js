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
					<div>Loading...</div>
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
		
		// console.log(projectList);
		return projectList;
	}




	render() {
		return(
				<div className="page-container row">
					<ul>
						{ this.renderProjectList() }
					</ul>
				</div>
			);
	}

}


function mapStateToProps({ content }) {
	return { content };
}

export default connect(mapStateToProps, { fetchContent })(ProjectList);