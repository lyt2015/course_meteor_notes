import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'
import { withTracker } from 'meteor/react-meteor-data'
import createHistory from 'history/createBrowserHistory'

import { Notes } from '../../api/notes'

export class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.note && this.props.note !== prevProps.note) {
      this.setState({ title: this.props.note.title, body: this.props.note.body })
    }
  }

  handleNoteTitleChange(e) {
    const title = e.target.value
    this.setState({ title })
    this.props.call('notes.update', this.props.note._id, { title })
  }

  handleNoteBodyChange(e) {
    const body = e.target.value
    this.setState({ body })
    this.props.call('notes.update', this.props.note._id, { body })
  }

  handleRemoveNote() {
    this.props.call('notes.remove', this.props.note._id)
    this.props.history.push('/dashboard')
    Session.set('selectedNoteId', null)
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <input
            type="text"
            value={this.state.title}
            placeholder="Untitled Note"
            onChange={e => this.handleNoteTitleChange(e)}
          />
          <textarea
            cols="30"
            rows="10"
            value={this.state.body}
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
  history: PropTypes.object.isRequired,
  call: PropTypes.func.isRequired,
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    history: createHistory(),
    call: Meteor.call,
  }
})(Editor)
