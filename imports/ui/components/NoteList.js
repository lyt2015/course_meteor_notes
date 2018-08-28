import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

import { Notes } from '../../api/notes'
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'
import NoteListEmptyItem from './NoteListEmptyItem'

export const NoteList = props => {
  const renderListItems = notes => {
    return notes.map(note => <NoteListItem key={note._id} note={note} />)
  }

  return (
    <div>
      <NoteListHeader />
      {props.notes.length === 0 ? <NoteListEmptyItem /> : renderListItems(props.notes)}
      NoteList: {props.notes.length}
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  Meteor.subscribe('notes')

  return {
    notes: Notes.find()
      .fetch()
      .map(note => {
        note.selected = note._id === selectedNoteId
        return note
      }),
  }
})(NoteList)
