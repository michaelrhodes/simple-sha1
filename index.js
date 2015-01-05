module.exports = sha1
module.exports.sync = sha1Sync

var crypto = require('crypto')

function sha1 (buf, cb) {
  var hash = sha1Sync(buf)
  process.nextTick(function () {
    cb(hash)
  })
}

function sha1Sync (buf) {
  return crypto.createHash('sha1')
    .update(buf)
    .digest('hex')
}
