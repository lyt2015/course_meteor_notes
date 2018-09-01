import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import { Editor } from './Editor'
import { notes } from '../../fixtures/fixtures'

Enzyme.configure({ adapter: new Adapter() })

if (Meteor.isClient) {
  describe('Editor', function() {
    let history
    let call

    beforeEach(function() {
      history = {
        push: jest.fn(),
      }
      call = jest.fn()
    })

    it('should render pick note message', function() {
      const wrapper = mount(<Editor history={history} call={call} />)

      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.')
    })

    it('should render note not found message', function() {
      const wrapper = mount(<Editor selectedNoteId="123" history={history} call={call} />)

      expect(wrapper.find('p').text()).toBe('Note not found!')
    })

    it('should remove a note', function() {
      const wrapper = mount(
        <Editor selectedNoteId={notes[0]._id} note={notes[0]} history={history} call={call} />
      )
      wrapper.find('button').simulate('click')

      expect(history.push).toHaveBeenCalledWith('/dashboard')
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id)
    })

    it('should update note title on input change', function() {
      const title = 'Test Title'
      const wrapper = mount(<Editor note={notes[0]} history={history} call={call} />)
      wrapper.find('input').simulate('change', { target: { value: title } })

      expect(wrapper.state('title')).toBe(title)
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title })
    })

    it('should update note body on textarea change', function() {
      const body = 'Test Contents'
      const wrapper = mount(<Editor note={notes[0]} history={history} call={call} />)
      wrapper.find('textarea').simulate('change', { target: { value: body } })

      expect(wrapper.state('body')).toBe(body)
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body })
    })

    it('should update component state when props changed', function() {
      const wrapper = mount(<Editor history={history} call={call} />)

      expect(wrapper.state('title')).toBeFalsy()
      expect(wrapper.state('body')).toBeFalsy()

      wrapper.setProps({ note: notes[0] })

      expect(wrapper.state('title')).toBe(notes[0].title)
      expect(wrapper.state('body')).toBe(notes[0].body)
    })

    it('should not update component state when no note provided for props', function() {
      const wrapper = mount(<Editor history={history} call={call} />)
      wrapper.setProps({ note: null })

      expect(wrapper.state('title')).toBeFalsy()
      expect(wrapper.state('body')).toBeFalsy()
    })
  })
}
