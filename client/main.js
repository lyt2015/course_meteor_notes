import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import '../imports/startup/simple-schema-configuration'
import { routes, onAuthAndRouteChange } from '../imports/routes/routes'

const history = createHistory()

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  const currentPagePrivacy = Session.get('currentPagePrivacy')
  onAuthAndRouteChange(isAuthenticated, currentPagePrivacy)
})

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  if (selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`)
    Session.set('isNavOpen', false)
  } else {
    Session.set('isNavOpen', true)
  }
})

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen')
  document.body.classList.toggle('nav-is-open', isNavOpen)
})

Meteor.startup(() => {
  Session.set('selectedNoteId', null)
  Session.set('isNavOpen', false)
  ReactDOM.render(routes, document.getElementById('app'))
})
