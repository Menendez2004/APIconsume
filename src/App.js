//styles
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
//Dom
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
//pages
import Login from './components/login';//eror que no se porque sale, es por uso de mayuca
import Dasboard from './components/dashboard';
import Edit from './components/edit';
import New from './components/new';

function App() {
  return (
    <React.Fragment>
        <Router>
          <Switch>
              <Route path='/' exact render = { props =>(<Login {...props }/>)}></Route>
              <Route path='/dashboard' exact render = { props =>(<Dasboard {...props }/>)}></Route>
              <Route path='/new' exact render = { props =>(<New {...props }/>)}></Route>
              <Route path='/edit/:id' exact render = { props =>(<Edit {...props }/>)}></Route>
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
