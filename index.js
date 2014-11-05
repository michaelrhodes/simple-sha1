var crypto = require('crypto')

module.exports = function(buf, raw) {
  return crypto.createHash('sha1')
    .update(buf)
    .digest(raw ? '' : 'hex')
}
