import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data'

export const PrivateHeader = props => {
  const navImageSource = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg'

  return (
    <div className="header">
      <div className="header__content">
        <img
          className="header__nav-toggle"
          onClick={props.handleNavToggle}
          src={navImageSource}
          alt="menu icon"
        />
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
  isNavOpen: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleNavToggle: PropTypes.func.isRequired,
}

export default withTracker(props => ({
  isNavOpen: Session.get('isNavOpen'),
  handleLogout: () =>
    Meteor.logout(err => {
      if (err) {
        return console.error('Logout Error:', err)
      }
    }),
  handleNavToggle: () => {
    Session.set('isNavOpen', !Session.get('isNavOpen'))
  },
}))(PrivateHeader)
