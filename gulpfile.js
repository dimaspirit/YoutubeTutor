const gulp = require('gulp');

const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({livereload: true});
});

gulp.task('injectHtml', function () {
  return gulp.src('./src/*.html')
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
  gulp.watch(['./src/*.html', './src/html_partials/*.html'], ['injectHtml']);
  gulp.watch('./src/css/*.css', ['styles']);
});

gulp.task('default', ['injectHtml', 'styles', 'watch', 'connect']);