import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { view as Login } from './login'
import { view as Dashboard } from './dashboard'
import { view as DataEntry } from './dataEntry'
import { view as PersonnelTable } from './personnelManagement'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Dashboard} />
      <Route path='/login' component={Login} />
      <Route path='/dataEntry' component={DataEntry} />
      <Route path='/personnel' component={PersonnelTable} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>, document.getElementById('root'))
