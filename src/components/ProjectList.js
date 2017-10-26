import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchContent, deletePost } from '../actions';

class ProjectList extends Component {


	componentDidMount() {
		// Fetch content according to current pathname
		const pathName = this.props.history.location.pathname;
		this.props.fetchContent(pathName);

		// console.log(pathName);
	}



	handleDeletePost(projectId) {
		let msg;

		// Conditionals for deleting post
		if(window.confirm('Delete this post?') === true) {
			msg = 'Post will be deleted.';

			// Delete post 
			this.props.deletePost(projectId);

		} else {
			msg = 'Sure! Nothing will be deleted.';
		} 

		alert(msg);
	}



	// Project list
	renderProjectList() {
		const content = this.props.content;

		// console.log(content);

		// If content is undefined / null
		if(!content || content.length === 0) {
			return(
					<div className="loading-wrapper">
						Looks like master has not posted anything yet...
					</div>
				);
		}
	

		


		// Render project list
		const pathName = this.props.history.location.pathname;
		const dateClassName = (pathName === '/ongoing') ? 'hide' : '';

		const projectList = content.map((project, id) => {
			const projectName = project.projectName;
			const projectDate = project.projectDate;
			const projectId = project.projectId;
			return (pathName === '/dashboard/posts') ? 

			// If location @ dashboard post list
			(
				<li key={ projectName }>
					<div className="d-flex flex-row">
						<h5 className="mr-5">{ projectName }</h5>
						<label className={ dateClassName }>[ { projectDate } ]</label>
					</div>

					<div className="post-edit-wrapper">
						<Link to={`/dashboard/edit-post/${projectId}`}>
							<i className="fa fa-edit"></i>
						</Link>

						<Link to={ pathName } onClick={ () => this.handleDeletePost(projectId) }>
							<i className="fa fa-trash-o"></i>
						</Link>
					</div>					
				</li>
				)

			// If location @ ongoing / past projects
			: (
				<li key={ projectName }>
					<Link to={`${pathName}/${id}`} className="d-flex flex-row">
						<div className="d-flex flex-row">
							<h5 className="mr-5">{ projectName }</h5>
							<label className={ dateClassName }>[ { projectDate } ]</label>
						</div>
					</Link>
				</li>
				);
		});
		

		// Change layout according to number of projects available
		let className;

		// If projects > 10
		(content.length < 4) ? className = 'list-wrapper center' 
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

export default connect(mapStateToProps, { fetchContent, deletePost })(ProjectList);