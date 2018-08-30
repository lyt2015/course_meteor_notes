import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'

import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList'
import Editor from './Editor'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
    }

    this.props.onEnter(props)
  }

  componentDidMount() {
    this.userTracker = Tracker.autorun(() => {
      const user = Meteor.user()
      if (user) {
        const address = Meteor.user().emails[0].address
        this.setState({ address })
      }
    })
  }

  componentWillUnmount() {
    this.userTracker.stop()
    Session.set('selectedNoteId', null)
  }

  render() {
    return (
      <div>
        <PrivateHeader title={`Dashboard for ${this.state.address}`} history={this.props.history} />
        <div className="page-content">
          <NoteList />
          <Editor />
        </div>
      </div>
    )
  }
}
