var Rusha = require('rusha')

var worker = Rusha.createWorker()
var nextTaskId = 1
var cbs = {} // taskId -> cb

worker.onmessage = function onRushaMessage (e) {
  var taskId = e.data.id
  var cb = cbs[taskId]
  delete cbs[taskId]

  if (e.data.error != null) {
    // This should never happen!
    throw new Error('Rusha worker error: ' + e.data.error)
  } else {
    cb(e.data.hash)
  }
}

function sha1 (buf, cb) {
  cbs[nextTaskId] = cb
  worker.postMessage({ id: nextTaskId, data: buf })
  nextTaskId += 1
}

module.exports = sha1
