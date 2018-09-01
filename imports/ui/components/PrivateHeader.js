import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

export const PrivateHeader = props => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={props.handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default withTracker(props => ({
  handleLogout: () =>
    Meteor.logout(err => {
      if (err) {
        return console.error('Logout Error:', err)
      }
    }),
}))(PrivateHeader)
