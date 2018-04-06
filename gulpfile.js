const gulp = require('gulp');

const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

// const livereload = require('gulp-livereload');

const connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({livereload: true});
});

// gulp.task('minify-html', () => {
//   return gulp.src('./src/index.html')
//     .pipe(htmlmin({'collapseWhitespace': true}))
//     .pipe(gulp.dest('./'));
// });

gulp.task('injectHtml', function () {
  return gulp.src('./src/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

gulp.task('styles', () => {
  return gulp.src('./src/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});



gulp.task('watch', function() {
  gulp.watch(['./src/index.html', './src/html_partials/*.html'], ['injectHtml']);
  gulp.watch('./src/css/*.css', ['styles']);
});

// Uses as a develop command
gulp.task('default', ['injectHtml', 'styles', 'watch', 'connect']);
// Uses as a build command
// gulp.task('build', ['injectHtml']);