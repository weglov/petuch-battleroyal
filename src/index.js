import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import TopScore from './TopScore';


ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path="/" component={TopScore}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));


