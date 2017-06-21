var complaints = require('./tasks/complaints')
var handles = require('./tasks/handles')
var tasks = [complaints, handles]
function run (task) {
  setInterval(function () {
    task.run()
  }, task.timeTick)
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
