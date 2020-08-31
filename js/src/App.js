import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home  from './Views/Home';
import Projects from './Views/Projects';
import About from './Views/About';
import NavBar from './Components/NavBar';
import Login from './Views/Login';
import Register from './Views/Register';
import axios from 'axios';
import {
  defaultBase
} from './Config/UrlList';
import './css/App.scss';

axios.defaults.baseURL = defaultBase;

class App extends Component {
  render() {
    return (    
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/Home" component={Home}/>       
          <Route exact path="/Projects" component={Projects} />
          <Route exact path="/About" component={About} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path='/'>
            <Redirect to="/Home" />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
