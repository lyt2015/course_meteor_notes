import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

export const NoteListHeader = props => {
  const handleCreateNote = () => {
    props.meteorCall('notes.insert', (err, res) => {
      if (err) {
        throw err
      }
      // res is note id
    })
  }

  return (
    <div>
      <button onClick={handleCreateNote}>Create Note</button>
    </div>
  )
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call,
  }
})(NoteListHeader)
