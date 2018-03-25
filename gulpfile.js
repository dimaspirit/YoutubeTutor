const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-html', () => {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('minify-css', () => {
  return gulp.src('./src/styles.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['minify-html', 'minify-css']);