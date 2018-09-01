import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Switch } from 'react-router'
import { Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { Session } from 'meteor/session'

import Signup from '../ui/components/Signup'
import Dashboard from '../ui/components/Dashboard'
import NotFound from '../ui/components/NotFound'
import Login from '../ui/components/Login'

const history = createHistory()
const historyListener = (location, action) => {
  console.group('history.listen')
  console.log('location:', location)
  console.log('action:', action)
  console.groupEnd()
}
// history.listen(historyListener)

export const onAuthAndRouteChange = (isAuthenticated, currentPagePrivacy) => {
  const pathname = history.location.pathname
  const inPublicPage = currentPagePrivacy === 'public'
  const inPrivatePage = currentPagePrivacy === 'private'

  if (isAuthenticated && inPublicPage) {
    history.replace('/dashboard')
  }

  if (!isAuthenticated && inPrivatePage) {
    history.replace('/')
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={props => <Login {...props} />} />
      <Route path="/signup" render={props => <Signup {...props} />} />
      <Route path="/dashboard" exact render={props => <Dashboard {...props} />} />
      <Route path="/dashboard/:id" render={props => <Dashboard {...props} />} />
      <Route path="*" privacy="public" component={NotFound} />
    </Switch>
  </Router>
)
