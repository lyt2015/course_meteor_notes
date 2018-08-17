import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'

const PrivateHeader = props => {
  const handleLogout = () => {
    Meteor.logout(err => {
      if (err) {
        return console.error('Logout Error:', err)
      }
    })
  }

  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PrivateHeader
