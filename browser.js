var Rusha = require('rusha')

var rusha = new Rusha
var crypto = window.crypto || window.msCrypto || {}
var subtle = crypto.subtle || crypto.webkitSubtle

// Browsers throw if they lack support for an algorithm.
try { subtle.digest({ name: 'sha-1'}, new Uint8Array) }
catch (err) { subtle = false }

// Rusha inserts a global for some reason.
delete window.Rusha

function sha1 (buf, cb) {
  if (!subtle) {
    // Use Rusha
    setTimeout(cb, 0, sha1sync(buf))
    return
  }

  if (typeof buf === 'string') {
    buf = uint8array(buf)
  }

  subtle.digest({ name: 'sha-1' }, buf)
    .then(function succeed (result) {
      cb(hex(new Uint8Array(result)))
    },
    // Promise will be rejected on non-secure origins.
    // See: http://goo.gl/lq4gCo
    function fail (error) {
      cb(sha1sync(buf))
    })
}

function sha1sync (buf) {
  return rusha.digest(buf)
}

function uint8array (s) {
  var l = s.length
  var array = new Uint8Array(l)
  for (var i = 0; i < l; i++) {
    array[i] = s.charCodeAt(i)
  }
  return array
}

function hex (buf) {
  var l = buf.length
  var chars = []
  for (var i = 0; i < l; i++) {
    var bite = buf[i]
    chars.push((bite >>> 4).toString(16))
    chars.push((bite & 0x0f).toString(16))
  }
  return chars.join('')
}

module.exports = sha1
module.exports.sync = sha1sync
