import React from 'react'
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'

import { Notes } from '../../api/notes'

export class Editor extends React.Component {
  handleNoteTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value,
    })
  }

  handleNoteBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value,
    })
  }

  handleRemoveNote() {
    this.props.call('notes.remove', this.props.note._id)
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <input
            type="text"
            value={this.props.note.title}
            placeholder="Untitled Note"
            onChange={e => this.handleNoteTitleChange(e)}
          />
          <textarea
            cols="30"
            rows="10"
            value={this.props.note.body}
            placeholder="Your note here"
            onChange={e => this.handleNoteBodyChange(e)}
          />
          <button onClick={() => this.handleRemoveNote()}>Delete Note</button>
        </div>
      )
    }

    return (
      <p>
        {this.props.selectedNoteId ? 'Note not found!' : 'Pick or create a note to get started.'}
      </p>
    )
  }
}

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
  call: PropTypes.func.isRequired,
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
  }
})(Editor)
