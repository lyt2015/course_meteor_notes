import { Meteor } from 'meteor/meteor'
import expect from 'expect'

import { Notes } from './notes'

if (Meteor.isServer) {
  const testNote1 = {
    _id: 'testNote1Id',
    title: 'testNote1 Title',
    body: 'testNote1 Body',
    updatedAt: 0,
    userId: 'testUser1Id',
  }
  const testNote2 = {
    _id: 'testNote2Id',
    title: 'testNote2 Title',
    body: 'testNote2 Body',
    updatedAt: 0,
    userId: 'testUser1Id',
  }
  const testNote3 = {
    _id: 'testNote3Id',
    title: 'testNote3 Title',
    body: 'testNote3 Body',
    updatedAt: 0,
    userId: 'testUser2Id',
  }

  beforeEach(function() {
    Notes.remove({})
    Notes.insert(testNote1)
    Notes.insert(testNote2)
    Notes.insert(testNote3)
  })

  describe('notes', function() {
    describe('insert', function() {
      it('should insert new note', function() {
        const userId = 'fakeUserId'
        const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId })

        // findOne() will return undefined if there are no matched document
        expect(Notes.findOne({ _id, userId })).toBeTruthy()
      })

      it('should not insert note if not authenticated', function() {
        expect(() => {
          Meteor.server.method_handlers['notes.insert']()
        }).toThrow()
      })
    })

    describe('remove', function() {
      it('should remove note', function() {
        const _id = testNote1._id
        const userId = testNote1.userId
        Meteor.server.method_handlers['notes.remove'].apply({ userId }, [_id])

        expect(Notes.findOne({ _id })).toBeFalsy()
      })

      it('should not remove note if not authenticated', function() {
        const _id = testNote1._id

        expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({}, [_id])
        }).toThrow()
      })

      it('should not remove note if invalid _id', function() {
        const userId = testNote1.userId

        expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({ userId })
        }).toThrow()
      })
    })

    describe('update', function() {
      it('should update note', function() {
        const _id = testNote1._id
        const userId = testNote1.userId
        const updates = {
          title: 'New Title',
        }
        Meteor.server.method_handlers['notes.update'].apply({ userId }, [_id, updates])
        const updatedNote = Notes.findOne({ _id })

        expect(updatedNote.updatedAt).toBeGreaterThan(testNote1.updatedAt)
        expect(updatedNote).toEqual(
          expect.objectContaining({
            title: updates.title,
            body: testNote1.body,
          })
        )
      })

      it('should throw an error trying to update non-existing property', function() {
        const _id = testNote1._id
        const userId = testNote1.userId
        const updates = {
          done: true,
        }

        expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({ userId }, [_id, updates])
        }).toThrow()
      })

      it('should not update note if user is not the creator', function() {
        const _id = testNote1._id
        const userId = 'fakeUserId'
        const updates = { title: 'New Title' }

        Meteor.server.method_handlers['notes.update'].apply({ userId }, [_id, updates])

        expect(Notes.findOne({ _id })).toEqual(expect.objectContaining(testNote1))
      })

      it('should not update note if not authenticated', function() {
        const userId = null
        const _id = testNote1._id
        const updates = { title: 'New Title' }

        expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({ userId }, [_id, updates])
        }).toThrow()
      })

      it('should not update note if invalid _id', function() {
        const userId = testNote1.userId
        const _id = 'fakeNoteId'
        const updates = { title: 'New Title' }

        Meteor.server.method_handlers['notes.update'].apply({ userId }, [_id, updates])

        expect(Notes.findOne({ _id: testNote1._id })).toEqual(expect.objectContaining(testNote1))
      })
    })

    describe('publication', function() {
      it('should return a users notes', function() {
        const userId = testNote1.userId

        const res = Meteor.server.publish_handlers.notes.apply({ userId })
        const notes = res.fetch()

        expect(notes).toHaveLength(2)
        expect(notes).toEqual(expect.arrayContaining([testNote1]))
        expect(notes).toEqual(expect.arrayContaining([testNote2]))
      })

      it('should return no notes for a user that has none', function() {
        const userId = 'fakeUserId'

        const res = Meteor.server.publish_handlers.notes.apply({ userId })
        const notes = res.fetch()

        expect(notes).toHaveLength(0)
      })
    })
  })
}
