import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Home } from './Views/Home';
import { Projects } from './Views/Projects';
import { NavBar } from './Components/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/Home" Component={Home} />
          <Route exact path='/'>
            <Redirect to="/Home" />
          </Route>
          <Route exact path="/Projects" Component={Projects} />
        </Switch>
      </div>
    );
  }
}

export default App;
