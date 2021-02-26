const benchmark = window.Benchmark = require('benchmark')
const gitsha1 = require('git-sha1')
const sha1 = require('./')

const size = Math.pow(2, 24)
const buffer = Buffer.alloc(size)

benchmark.Suite()
  .add('sha1', function () {
    sha1(buffer, function () {})
  })
  .add('sha1.sync', function () {
    sha1.sync(buffer)
  })
  .add('git-sha1', function () {
    gitsha1(buffer)
  })
  .on('error', error)
  .on('cycle', cycle)
  .on('complete', complete)
  .run({ async: true })

function error (e) {
  console.error(e.target.error.stack)
}

function cycle (e) {
  console.log(String(e.target))
}

function complete () {
  if (process.browser) {
    const crypto = window.crypto || window.msCrypto || {}
    let subtle = crypto.subtle || crypto.webkitSubtle
    try { subtle.digest({ name: 'sha-1' }, new Uint8Array()) } catch (err) { subtle = false }
    if (subtle) console.log('sha1 used WebCryptoAPI')
  }
  console.log('Fastest is ' + this.filter('fastest').map('name'))
}
