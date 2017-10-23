import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
	render() {
		return(
				<div className="page-container row">
					<div className="dash-buttons-container">
						<Link to="/dashboard/create-post">
							+ Make a new post
						</Link>

						<Link to="/dashboard/posts">
							Edit posts
						</Link>
					</div>
				</div>
			);
	}
}

export default Dashboard;