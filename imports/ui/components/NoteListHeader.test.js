import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import { NoteListHeader } from './NoteListHeader'
import { notes } from '../../fixtures/fixtures'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  let call
  let Session

  beforeEach(function() {
    call = jest.fn()
    Session = {
      set: jest.fn(),
    }
  })

  describe('NoteListHeader', function() {
    it('should call meteorCall on click', function() {
      const wrapper = mount(<NoteListHeader meteorCall={call} Session={Session} />)
      wrapper.find('button').simulate('click')

      // method 1
      expect(call.mock.calls[0][0]).toBe('notes.insert')

      // method 2
      expect(call).toHaveBeenCalledWith('notes.insert', expect.any(Function))

      call.mock.calls[0][1](undefined, notes[0]._id)

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
    })

    it('should set selectedNoteId for failed insert', function() {
      const wrapper = mount(<NoteListHeader meteorCall={call} Session={Session} />)
      wrapper.find('button').simulate('click')
      expect(() => {
        call.mock.calls[0][1](new Error('Just a fail.'), undefined)
      }).toThrow()

      expect(call).toHaveBeenCalledWith('notes.insert', expect.any(Function))
      expect(Session.set).not.toHaveBeenCalled()
    })
  })
}
