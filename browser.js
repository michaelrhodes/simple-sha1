module.exports = sha1
module.exports.sync = sha1Sync

var Rusha = require('rusha')
delete window.Rusha // Rusha inserts a global for some reason

var rusha = new Rusha() // Re-use the same Rusha instance

var crypto = window.crypto || window.msCrypto
var subtle = crypto.subtle || crypto.webkitSubtle

function sha1 (buf, cb) {
  if (subtle) {
    // prefer WebCrypto API
    if (typeof buf === 'string') buf = stringToTypedArray(buf)
    subtle.digest({ name: 'sha-1' }, buf).then(function (result) {
      cb(typedArrayToHexString(new Uint8Array(result)))
    })
  } else {
    // Fallback to Rusha
    var hash = sha1Sync(buf)
    setTimeout(function () {
      cb(hash)
    }, 0)
  }
}

function sha1Sync (buf) {
  return rusha.digest(buf)
}

function stringToTypedArray (s) {
  var plaintextBuf = new Uint8Array(s.length)
  for (var i = 0; i < s.length; i++) {
    plaintextBuf[i] = s.charCodeAt(i)
  }
  return plaintextBuf
}

function typedArrayToHexString (buf) {
  var hexChars = []
  for (var i = 0; i < buf.length; i++) {
    var bite = buf[i]
    hexChars.push((bite >>> 4).toString(16))
    hexChars.push((bite & 0x0f).toString(16))
  }
  var hexString =  hexChars.join('')
  return hexString
}
