import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import { NoteListHeader } from './NoteListHeader'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('NoteListHeader', function() {
    it('should call meteorCall on click', function() {
      const spy = jest.fn()
      const wrapper = mount(<NoteListHeader meteorCall={spy} />)
      wrapper.find('button').simulate('click')

      // method 1
      expect(spy.mock.calls[0][0]).toBe('notes.insert')

      // method 2
      expect(spy).toHaveBeenCalledWith('notes.insert', expect.any(Function))
    })
  })
}
