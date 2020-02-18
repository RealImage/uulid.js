const uulidjs = require('./index')

const assert = require('assert')
const mocha = require('mocha')
const isValidUuid = require('uuid-validate')
const moment = require('moment')

mocha.describe('UULID', function () {
  mocha.it('Function should return a valid UUID', function () {
    assert.equal(isValidUuid(uulidjs.UulidString(new Date(), "the quick brown fox jumps over the lazy dog")), true)
  })
  mocha.it('Function should return the correct UUID', function () {
    assert.equal(uulidjs.UulidString('2009-11-10T23:00:00Z', 'the quick brown fox jumps over the lazy dog'), '0124e053-3580-1631-2751-ef9307c3fd1a')
  })
  mocha.it('UULID\'s should be sortable based on timestamps', function () {
      let now = moment()
      let earlier = moment(now).subtract(1, 'seconds')
      let later = moment(now).add(1, 'seconds')
      
      const nowUulid = uulidjs.UulidString(now, 'the quick brown fox jumps over the lazy dog')
      const earlierUulid = uulidjs.UulidString(earlier, 'the quick brown fox jumps over the lazy dog')
      const laterUulid = uulidjs.UulidString(later, 'the quick brown fox jumps over the lazy dog')

      assert(nowUulid > earlierUulid, 'Uulid generated in a later point in time is greater than uulid generated before it')
      assert(laterUulid > nowUulid, 'Uulid generated in a later point in time is greater than uulid generated before it')
  })
})
