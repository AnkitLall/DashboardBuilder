import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home  from './Views/Home';
import Projects from './Views/Projects';
import About from './Views/About';
import NavBar from './Components/NavBar/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar 
          userName={'Guest'}
        />
        <Switch>
          <Route exact path="/Home" component={Home}/>       
          <Route exact path="/Projects" component={Projects} />
          <Route exact path="/About" component={About} />
          <Route exact path='/'>
            <Redirect to="/Home" />
          </Route>
        </Switch>
      </div>
    );
  }
}

// function Home() {
//   return <h2>Home</h2>;
// }


export default App;
