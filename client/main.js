import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import ReactDOM from 'react-dom'

import '../imports/startup/simple-schema-configuration'
import { routes, onAuthChange } from '../imports/routes/routes'

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'))
})
