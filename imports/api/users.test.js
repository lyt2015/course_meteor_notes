import { Meteor } from 'meteor/meteor'
import expect from 'expect'

import { validateNewUser } from './users'

if (Meteor.isServer) {
  describe('users', function() {
    it('should allow valid email address', function() {
      const validUser = {
        emails: [{ address: 'user@example' }],
      }

      expect(validateNewUser(validUser)).toBeTruthy()
    })

    it('should reject invalid email address', function() {
      const invalidUser = { emails: [{ address: 'wrongformat' }] }

      expect(() => {
        validateNewUser(invalidUser)
      }).toThrow()
    })
  })
}
