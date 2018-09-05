import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export const NoteListHeader = props => {
  const handleCreateNote = () => {
    props.meteorCall('notes.insert', (err, res) => {
      if (err) {
        throw err
      }
      // res is note id
      if (res) {
        props.Session.set('selectedNoteId', res)
      }
    })
  }

  const handleFilterChange = e => {
    props.Session.set('filter', e.target.value)
  }

  return (
    <div className="item-list__header">
      <button className="button" onClick={handleCreateNote}>
        Create Note
      </button>
      <input
        className="filter"
        type="text"
        placeholder="Find Your Notes"
        onChange={handleFilterChange}
      />
    </div>
  )
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call,
    Session,
  }
})(NoteListHeader)
