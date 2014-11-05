var Rusha = require('rusha')

// Rusha inserts a global for some reason.
delete window.Rusha

module.exports = function(buf, raw) {
  var rusha = new Rusha 
  var method = 'digest'
  if (raw) method += 'Raw'
  return rusha[method](buf)
}
