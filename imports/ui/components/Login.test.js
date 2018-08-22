import { Meteor } from 'meteor/meteor'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import expect from 'expect'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import { Login } from './Login'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error message', function() {
      const error = 'Something went wrong...'
      const wrapper = shallow(
        <MemoryRouter>
          <Login onEnter={() => {}} loginWithPassword={() => {}} />
        </MemoryRouter>
      )
        .find(Login)
        .dive()
      wrapper.setState({ error })
      const errorMessage = wrapper.find('p').text()

      expect(errorMessage).toBe(error)

      wrapper.setState({ error: '' })
      const count = wrapper.find('p').length

      expect(count).toBe(0)
    })

    it('should call loginWithPassword with the form data', function() {
      const email = 'name@example'
      const password = 'fakePassword'
      const spy = jest.fn()
      const wrapper = shallow(
        <MemoryRouter>
          <Login onEnter={() => {}} loginWithPassword={spy} />
        </MemoryRouter>
      )
        .find(Login)
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
      expect(spy.mock.calls[0][0]).toEqual({ email })
      expect(spy.mock.calls[0][1]).toBe(password)

      // method 2
      expect(spy).toHaveBeenCalledWith({ email }, password, expect.any(Function))
    })

    it('should set loginWithPassword callback errors', function() {
      const spy = jest.fn()
      const wrapper = shallow(
        <MemoryRouter>
          <Login onEnter={() => {}} loginWithPassword={spy} />
        </MemoryRouter>
      )
        .find(Login)
        .dive()

      const instance = wrapper.instance()
      instance.refs = {
        email: {
          value: '',
        },
        password: {
          value: '',
        },
      }

      const event = { preventDefault: () => {} }
      wrapper.find('form').simulate('submit', event)
      spy.mock.calls[0][2]({})
      expect(wrapper.state('error')).toBeTruthy()

      spy.mock.calls[0][2]()
      expect(wrapper.state('error')).toBeFalsy()
    })
  })
}
