const sha1 = require('../')
const test = require('tape')

test('sha1', function (t) {
  t.plan(2)
  // buffer
  sha1(Buffer.from('hey there'), function (hash) {
    t.equal(hash, '6b1c01703b68cf9b35ab049385900b5c428651b6')
  })
  // string
  sha1('hey there', function (hash) {
    t.equal(hash, '6b1c01703b68cf9b35ab049385900b5c428651b6')
  })
})

test('sha1.sync', function (t) {
  // buffer
  t.equal(sha1.sync(Buffer.from('hey there')), '6b1c01703b68cf9b35ab049385900b5c428651b6')
  // string
  t.equal(sha1.sync('hey there'), '6b1c01703b68cf9b35ab049385900b5c428651b6')
  t.end()
})
