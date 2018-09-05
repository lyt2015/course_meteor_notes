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
      needsConfirmation: true,
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
    if (
      !this.state.needsConfirmation ||
      window.confirm('Do you really want to delete this note?')
    ) {
      this.props.call('notes.remove', this.props.note._id)
      this.props.history.push('/dashboard')
      Session.set('selectedNoteId', null)
    }
  }

  handleAskConfirmation = e => {
    this.setState({ needsConfirmation: e.target.checked })
  }

  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input
            className="editor__title"
            type="text"
            value={this.state.title}
            placeholder="Untitled Note"
            onChange={e => this.handleNoteTitleChange(e)}
          />
          <textarea
            className="editor__body"
            value={this.state.body}
            placeholder="Your note here"
            onChange={e => this.handleNoteBodyChange(e)}
          />
          <div className="editor__operations">
            <button className="button button--secondary" onClick={() => this.handleRemoveNote()}>
              Delete Note
            </button>
            <label className="checkbox__label">
              <input
                className="checkbox__box"
                type="checkbox"
                name="confirmation"
                checked={this.state.needsConfirmation}
                onChange={this.handleAskConfirmation}
              />
              Ask me before delete a note.
            </label>
          </div>
        </div>
      )
    }

    return (
      <div className="editor">
        <p className="editor__message">
          {this.props.selectedNoteId ? 'Note not found!' : 'Pick or create a note to get started.'}
        </p>
      </div>
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
