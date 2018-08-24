import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NoteListItem from './NoteListItem'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('NoteListItem', function() {
    it('should render title and timestamp', function() {
      const title = 'Note Title for Test'
      const updatedAt = 1535098956594 //2018-08-24
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />)

      expect(wrapper.find('h5').text()).toBe(title)
      expect(wrapper.find('p').text()).toBe('8/24/18')
    })

    it('should set default title if no title set', function() {
      const title = ''
      const updatedAt = 1535098956594 //2018-08-24
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />)

      expect(wrapper.find('h5').text()).toBeTruthy()
    })
  })
}
