import { Meteor } from 'meteor/meteor'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import expect from 'expect'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import { Signup } from './Signup'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('Signup', function() {
    it('should show error message', function() {
      const error = 'Something went wrong...'
      const wrapper = shallow(
        <MemoryRouter>
          <Signup onEnter={() => {}} createUser={() => {}} />
        </MemoryRouter>
      )
        .find(Signup)
        .dive()
      wrapper.setState({ error })
      const errorMessage = wrapper.find('p').text()

      expect(errorMessage).toBe(error)

      wrapper.setState({ error: '' })
      const count = wrapper.find('p').length

      expect(count).toBe(0)
    })

    it('should call createUser with the form data', function() {
      const email = 'name@example'
      const password = 'fakePassword'
      const spy = jest.fn()
      const wrapper = shallow(
        <MemoryRouter>
          <Signup onEnter={() => {}} createUser={spy} />
        </MemoryRouter>
      )
        .find(Signup)
        .dive()

      const instance = wrapper.instance()
      instance.refs = {
        email: {
          value: email,
        },
        password: {
          value: password,
        },
      }
      const event = { preventDefault: () => {} }
      wrapper.find('form').simulate('submit', event)

      // method 1
      expect(spy.mock.calls[0][0]).toEqual({ email, password })

      // method 2
      expect(spy).toHaveBeenCalledWith({ email, password }, expect.any(Function))
    })

    it('should set error if password is short', function() {
      const spy = jest.fn()
      const wrapper = shallow(
        <MemoryRouter>
          <Signup onEnter={() => {}} createUser={spy} />
        </MemoryRouter>
      )
        .find(Signup)
        .dive()

      const instance = wrapper.instance()
      instance.refs = {
        email: {
          value: 'test@example',
        },
        password: {
          value: '123            ',
        },
      }
      const event = { preventDefault: () => {} }
      wrapper.find('form').simulate('submit', event)

      expect(wrapper.state('error')).toBeTruthy()
    })

    it('should set createUser callback errors', function() {
      const reason = 'Jus an error.'
      const spy = jest.fn()
      const wrapper = shallow(
        <MemoryRouter>
          <Signup onEnter={() => {}} createUser={spy} />
        </MemoryRouter>
      )
        .find(Signup)
        .dive()

      const instance = wrapper.instance()
      instance.refs = {
        email: {
          value: 'test@example',
        },
        password: {
          value: '123456789',
        },
      }
      const event = { preventDefault: () => {} }
      wrapper.find('form').simulate('submit', event)

      spy.mock.calls[0][1]({ reason })
      expect(wrapper.state('error')).toBe(reason)

      spy.mock.calls[0][1]()
      expect(wrapper.state('error')).toBeFalsy()
    })
  })
}
