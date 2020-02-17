const uulidjs = require('./index')

const assert = require('assert')
const mocha = require('mocha')
const isValidUUID = require('uuid-validate');

mocha.describe('UULID', function () {
  mocha.it('Function should return a valid UUID', function () {
    assert.equal(isValidUUID(uulidjs.UULIDString(new Date(), "the quick brown fox jumps over the lazy dog")), true)
  })
  mocha.it('Function should return the correct UUID', function () {
    assert.equal(uulidjs.UULIDString('2009-11-10T23:00:00Z', 'the quick brown fox jumps over the lazy dog'), '0124e053-3580-1631-2751-ef9307c3fd1a')
  })
})
