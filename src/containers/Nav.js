import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, fetchContent } from '../actions';
import logo from '../img/Banana.png';



class Nav extends Component {


	render() {
    const user = window.localStorage.getItem('user');

    const logoutBtn = (!user) ? 'hide' : 'fa fa-power-off';
    const dashBtn = (!user) ? 'hide' : 'fa fa-gear';


		return(
		        <div className="nav-wrapper">
		           <ul>
			            <Link to="/">
			              	<img src={logo} alt="Home" width="60" />
			            </Link>
			                
			            <Link to="/ongoing" onClick={ () => this.props.fetchContent('ongoing') }>
			            	Ongoing projects
			            </Link>
			                
			            <Link to="/past" onClick={ () => this.props.fetchContent('past') }>
			            	Past projects
			            </Link>

			                
			            <Link to="/dashboard">
			              	<i className={dashBtn} ></i>
			            </Link>
			                
			            <Link to="/" onClick={ () => this.props.logout() }>
			              	<i className={logoutBtn} title="Logout"></i>
			            </Link>
		           </ul>
		        </div>
			);
	}
}

export default connect(null, { logout, fetchContent })(Nav);