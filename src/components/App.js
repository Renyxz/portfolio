import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Nav from '../containers/Nav';
import Home from './Home';
import ProjectList from './ProjectList';
import BrowsePosts from './BrowsePosts';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import CreatePost from '../containers/CreatePost';
import adminLogo from '../img/admin-banana.png';



class App extends Component {


  // Year display in footer
  renderDate() {
    const date = new Date();
    const year = date.getFullYear();

    return year;
  }


  render() {
    const user = window.localStorage.getItem('user');
    const adminBtn = (!user) ? '' : 'hide';

    return (
      <div className="container-fluid">
        
        <div className="row">
          <div className="header fixed-top d-flex flex-row">  
            <Nav />

            <div className="social-media-wrapper">
              <ul className="social-media float-right d-flex flex-row">
                <a href="https://github.com/Renyxz" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-github"></i>
                </a>

                <a href="https://twitter.com/RenyxzDev" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-twitter"></i>
                </a>
                
                <a href="https://medium.com/@ren.yxz.dev" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-medium"></i>
                </a>

                <a href="https://hangouts.google.com/" target="_blank" rel="noopener noreferrer" title="ren.yxz.dev@gmail.com">
                  <i className="fa fa-send"></i>
                </a>
              </ul>
            </div>       
          </div>
        </div>

        <Route exact path="/" component={Home} />
        <Route exact path="/ongoing" component={ProjectList} />
        <Route exact path="/past" component={ProjectList} />
        <Route exact path="/:pathName/:id" component={BrowsePosts} />
        <Route exact path="/admin-login" component={AdminLogin} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/create-post" component={CreatePost} />

        <div className="row">
          <div className="footer fixed-bottom">
            <small> 
              &#169; {this.renderDate()} - Blended with 
              <i className="fa fa-heart ml-2 mr-2"></i> 
              by Ren Yingxian Zhou / Renyxz 
            </small>

            <Link to="/admin-login" className={adminBtn} >
              <img src={adminLogo} alt="Admin login portal" title="Admin login portal" width="30" />
            </Link>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
