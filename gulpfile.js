let gulp = require('gulp')
let build = require('./build/build')

gulp.task('build', function (cb) {
  build(function () {
    console.log('copy favicon.ico...')
    gulp.src('./src/assets/favicon.ico')
    .pipe(gulp.dest('./dist/src'))
  })
})

gulp.task('default', [], function () {
  console.log('nothing is run ...')
})
