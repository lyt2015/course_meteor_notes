import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import PrivateHeader from './PrivateHeader'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
    }

    this.props.onEnter()
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
  }

  render() {
    return (
      <div>
        <PrivateHeader title={`Dashboard for ${this.state.address}`} />
        <div className="page-content">Dashboard page content</div>
      </div>
    )
  }
}
