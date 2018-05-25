import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import TopScore from './TopScore';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path="/top" component={TopScore}/>
      <Route path="/" component={App}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();


