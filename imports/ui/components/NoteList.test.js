import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { NoteList } from './NoteList'

Enzyme.configure({ adapter: new Adapter() })

const notes = [
  {
    _id: 'noteId1',
    title: 'Title 001',
    body: 'Text 001',
    updatedAt: 0,
    userId: 'userId1',
  },
  {
    _id: 'noteId2',
    title: 'Title 002',
    body: 'Text 002',
    updatedAt: 1000,
    userId: 'userId2',
  },
]

if (Meteor.isClient) {
  describe('NoteList', function() {
    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes} />)

      expect(wrapper.find('NoteListItem').length).toBe(2)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0)
    })

    it('should render NoteListEmptyItem if no notes', function() {
      const wrapper = mount(<NoteList notes={[]} />)

      expect(wrapper.find('NoteListItem').length).toBe(0)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1)
    })
  })
}
