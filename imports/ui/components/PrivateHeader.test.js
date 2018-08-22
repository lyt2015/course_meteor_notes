import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import { PrivateHeader } from './PrivateHeader'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={() => {}} />)
      const buttonText = wrapper.find('button').text()

      expect(buttonText).toBe('Logout')
    })

    it('should use title prop as h1 text', function() {
      const title = 'The Title'
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}} />)
      const titleText = wrapper.find('h1').text()

      expect(titleText).toBe(title)
    })

    it('should call handleLogout on click', function() {
      const spy = jest.fn()
      const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={spy} />)
      wrapper.find('button').simulate('click')

      expect(spy).toHaveBeenCalled()
    })
  })
}
