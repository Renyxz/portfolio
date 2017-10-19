import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from './Home';
import Ongoing from './Ongoing';


class App extends Component {
  render() {
    return (
      <div className="container-fluid">

        <div className="row">
          <div className="header col-lg-12 d-flex flex-row">
            
            <ul>
              <Link to="/">Home</Link>
              <Link to="/ongoing">Ongoing projects</Link>
            </ul>

            <ul className="d-flex flex-row float-right">
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
      
        
        <Route exact path="/" component={Home} />
        <Route exact path="/ongoing" component={Ongoing} />
      </div>
    );
  }
}

export default App;
