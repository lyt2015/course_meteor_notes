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

    Session.set('currentPagePrivacy', 'private')
  }

  componentDidMount() {
    if (this.props.match.params.id && typeof this.props.match.params.id === 'string') {
      Session.set('selectedNoteId', this.props.match.params.id)
    }

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
          <div className="page-content__sidebar">
            <NoteList />
          </div>
          <div className="page-content__main">
            <Editor />
          </div>
        </div>
      </div>
    )
  }
}
