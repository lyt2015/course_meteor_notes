import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import { NoteListItem } from './NoteListItem'
import { notes } from '../../fixtures/fixtures'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('NoteListItem', function() {
    let Session

    beforeEach(() => {
      Session = {
        set: jest.fn(),
      }
    })

    it('should render title and timestamp', function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />)

      expect(wrapper.find('h5').text()).toBe(notes[0].title)
      expect(wrapper.find('p').text()).toBe('8/24/18')
    })

    it('should set default title if no title set', function() {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />)

      expect(wrapper.find('h5').text()).toBeTruthy()
    })

    it('should call Session.set on click', function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />)
      wrapper.find('div').simulate('click')

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
    })
  })
}
