import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, fetchContent } from '../actions';
import logo from '../img/Banana.png';



class Nav extends Component {


	showNav() {
		const nav = document.getElementById('nav');
		nav.style.height = '100%';
	}

	hideNav() {
		const nav = document.getElementById('nav');
		nav.style.height = '0%';
	}





	render() {
    const user = window.localStorage.getItem('user');

    const logoutBtn = (!user) ? 'hide' : 'fa fa-power-off';
    const dashBtn = (!user) ? 'hide' : 'fa fa-gear';


		return(
		        <div className="nav-wrapper">
		           <span className="menu-btn" onClick={ () => this.showNav() }>
		           		<i className="fa fa-reorder"></i>
		           	</span>

		           <div className="nav-list" id="nav">
			           	<span className="menu-close-btn" onClick={ () => this.hideNav() }>
			           		&times;
			           	</span>	
		           		
			           <ul className="nav-content">
			           		<li>
					            <Link to="/" onClick={ () => this.hideNav() }>
					              	<img src={logo} alt="Home" />
					            </Link>
			           		</li>	

			           		<li>
					            <Link to="/ongoing" onClick={ () => this.props.fetchContent('/ongoing') }>
					            	Ongoing projects
					            </Link>
			           		</li>

			           		<li>
					            <Link to="/past" onClick={ () => this.props.fetchContent('/past') }>
					            	Past projects
					            </Link>
			           		</li>

			           		<li>
					            <Link to="/dashboard" onClick={ () => this.hideNav() }>
					              	<i className={dashBtn} ></i>
					            </Link>
			           		</li>
			           		
			           		<li>
					            <Link to="/" onClick={ () => this.props.logout() }>
					              	<i className={logoutBtn} title="Logout"></i>
					            </Link>
			           		</li>
			           </ul>
		           </div>

		        </div>
			);
	}
}

export default connect(null, { logout, fetchContent })(Nav);