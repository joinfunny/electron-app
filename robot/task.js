var complaints = require('./tasks/complaints')
var handles = require('./tasks/handles')
var dataClean = require('./tasks/dataClean')
var tasks = [complaints, handles, dataClean]
function run (task) {
  setInterval(task.run.bind(task), task.timeTick)
}

module.exports.run = function () {
  var timer = setInterval(function () {
    if (tasks.length <= 0) {
      clearInterval(timer)
      timer = null
      return
    }
    var task = tasks.splice(tasks.length - 1)[0]
    run(task)
  }, 2000)
}
