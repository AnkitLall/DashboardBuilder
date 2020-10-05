import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Home  from './Views/Home';
import Projects from './Views/Projects';
import About from './Views/About';
import NavBar from './Components/NavBar';
import Login from './Views/Login';
import Register from './Views/Register';
import ProjectPage from './Views/ProjectPage';
import { defaultBase } from './Config/UrlList';
import { setDisplayCheck } from './Slices/ProjectSlice';
import { useHistory } from 'react-router-dom';

import SliderRedirect from './Views/Slider/SliderRedirect';
import './css/App.scss';

axios.defaults.baseURL = defaultBase;

export default function App(props) {
  
  let displayProjectPage = useSelector(state => state.projectPage.displayCheck);
  let dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if(history.location.pathname !== '/Projects/ProjectPage') {
      dispatch(setDisplayCheck(false));
    }
  })

  return (    
    <div className="App">      
      {        
        <div style={{height:'100%'}}>
        {/* {
          !displayProjectPage &&
          <NavBar />
        } */}
          <Switch>
            <Route exact path="/Home" component={Home}/>       
            <Route exact path="/Projects" component={Projects} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Projects/ProjectPage" component={ProjectPage}/>
            <Route exact path="/slider/redirect" component={SliderRedirect}/>
            <Route exact path='/'>
              <Redirect to="/Home" />
            </Route>
          </Switch>
        
        </div>        
      } 
      
    </div>
  );  
}
