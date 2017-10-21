import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './Home';
import Ongoing from './Ongoing';
import Past from './Past';
import logo from '../img/Banana.png';



class App extends Component {
  render() {
    return (
      <div className="container-fluid">

        <div className="row">
          <div className="header col-lg-12 d-flex flex-row">
            
            <div className="nav-wrapper">
              <ul>
                <Link to="/">
                  <img src={logo} alt="Home" width="60" />
                </Link>
                
                <Link to="/ongoing">Ongoing projects</Link>
                
                <Link to="/past">Past projects</Link>
              </ul>
            </div>

            <div className="float-right">
              <ul className="social-media d-flex flex-row">
                <a href="https://github.com/Renyxz" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-github"></i>
                </a>

                <a href="https://twitter.com/RenyxzDev" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-twitter"></i>
                </a>
                
                <a href="https://medium.com/@ren.yxz.dev" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-medium"></i>
                </a>
              </ul>
            </div>
          </div>
        
        </div>        
      
        
        <Route exact path="/" component={Home} />
        <Route exact path="/ongoing" component={Ongoing} />
        <Route exact path="/past" component={Past} />
      </div>
    );
  }
}

export default App;
