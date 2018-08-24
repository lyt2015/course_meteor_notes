import { Meteor } from 'meteor/meteor'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import expect from 'expect'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import { Signup } from './Signup'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('Signup', function() {
    it('should show error message', function() {
      const error = 'Something went wrong...'
      const wrapper = mount(
        <MemoryRouter>
          <Signup onEnter={() => {}} createUser={() => {}} />
        </MemoryRouter>
      )
      wrapper
        .find(Signup)
        .instance()
        .setState({ error })
      wrapper.update()
      const errorMessage = wrapper.find('p').text()

      expect(errorMessage).toBe(error)

      wrapper
        .find(Signup)
        .instance()
        .setState({ error: '' })
      wrapper.update()
      const count = wrapper.find('p').length

      expect(count).toBe(0)
    })

    it('should call createUser with the form data', function() {
      const email = 'name@example'
      const password = 'fakePassword'
      const spy = jest.fn()
      const wrapper = mount(
        <MemoryRouter>
          <Signup onEnter={() => {}} createUser={spy} />
        </MemoryRouter>
      )
      wrapper.find('#email').instance().value = email
      wrapper.find('#password').instance().value = password
      wrapper.find('form').simulate('submit', { preventDefault: () => {} })

      // method 1
      expect(spy.mock.calls[0][0]).toEqual({ email, password })

      // method 2
      expect(spy).toHaveBeenCalledWith({ email, password }, expect.any(Function))
    })

    it('should set error if password is short', function() {
      const spy = jest.fn()
      const wrapper = mount(
        <MemoryRouter>
          <Signup onEnter={() => {}} createUser={spy} />
        </MemoryRouter>
      )
      wrapper.find('#email').instance().value = 'test@example'
      wrapper.find('#password').instance().value = '123                 '
      wrapper.find('form').simulate('submit', { preventDefault: () => {} })

      expect(wrapper.find(Signup).instance().state.error).toBeTruthy()
    })

    it('should set createUser callback errors', function() {
      const reason = 'Jus an error.'
      const spy = jest.fn()
      const wrapper = mount(
        <MemoryRouter>
          <Signup onEnter={() => {}} createUser={spy} />
        </MemoryRouter>
      )
      wrapper.find('#email').instance().value = 'test@example'
      wrapper.find('#password').instance().value = '123456789'
      wrapper.find('form').simulate('submit', { preventDefault: () => {} })

      spy.mock.calls[0][1]({ reason })
      expect(wrapper.find(Signup).instance().state.error).toBe(reason)

      spy.mock.calls[0][1]()
      expect(wrapper.find(Signup).instance().state.error).toBeFalsy()
    })
  })
}
