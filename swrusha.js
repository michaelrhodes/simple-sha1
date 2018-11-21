var Rusha = require('rusha')

var worker = Rusha.createWorker()
var queue = {};
var lastId = 0

worker.onmessage = function onRushaMessage (e) {
    var taskId = e.data.id
    var cb = queue[taskId]
    delete queue[taskId]

    if (e.data.error) {
        cb(null)
    } else {
        cb(e.data.hash)
    }
};

function sha1 (buf, cb) {
    var taskId = lastId++
    queue[taskId] = cb
    worker.postMessage({ id: taskId, data: buf })
}

module.exports = sha1