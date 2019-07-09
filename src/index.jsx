import React from 'react'
import ReactDOM from 'react-dom'
import { view as Login } from './login'
import { view as Dashboard } from './dashboard'
import { DataEntry } from './admin'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Dashboard} />
      <Route path='/login' component={Login} />
      <Route path='/admin' component={DataEntry} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>, document.getElementById('root'))
