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

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    history.replace('/dashboard')
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    history.replace('/')
  }
}

const onEnterNotePage = nextProps => {
  if (!Meteor.userId()) {
    history.replace('/')
  } else {
    Session.set('selectedNoteId', nextProps.match.params.id)
  }
}

const publicPages = ['/', '/signup']
const privatePages = ['/dashboard']
export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname
  const inPublicPage = publicPages.includes(pathname)
  const inPrivatePage = privatePages.some(privatePage => {
    return pathname.startsWith(privatePage)
  })

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
      <Route path="/" exact render={props => <Login {...props} onEnter={onEnterPublicPage} />} />
      <Route path="/signup" render={props => <Signup {...props} onEnter={onEnterPublicPage} />} />
      <Route
        path="/dashboard"
        exact
        render={props => <Dashboard {...props} onEnter={onEnterPrivatePage} />}
      />
      <Route
        path="/dashboard/:id"
        render={props => <Dashboard {...props} onEnter={onEnterNotePage} />}
      />
      <Route path="*" privacy="public" component={NotFound} />
    </Switch>
  </Router>
)
