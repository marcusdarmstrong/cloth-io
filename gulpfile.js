'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babel = require('gulp-babel');

gulp.task('clean-server', function() {
  return del(['bin/*.js']);
});

gulp.task('clean-client', function() {
  return del(['public/*.js', 'public/*.map']);
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('client', ['clean-client'], function() {
  return browserify(/*{ debug: true }*/)
    .transform(babelify)
    .require('src/client.js', { entry: true })
    .bundle()
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public'));
});

gulp.task('server', ['clean-server'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('bin'));
});

gulp.task('default', ['lint', 'server', 'client']);