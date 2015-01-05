var Rusha = require('rusha')

// Rusha inserts a global for some reason.
delete window.Rusha

var rusha = new Rusha
module.exports = function(buf, raw) {
  var method = raw ? 'rawDigest' : 'digest'
  return rusha[method](buf)
}
