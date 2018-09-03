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
  }
})

Meteor.startup(() => {
  Session.set('selectedNoteId', null)
  ReactDOM.render(routes, document.getElementById('app'))
})
