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
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var insert = require('gulp-insert');
var rename = require('gulp-rename');

gulp.task('clean-manifest', function() {
  return del(['src/manifest.js']);
});

gulp.task('clean-server', function() {
  return del(['bin/*.js']);
});

gulp.task('clean-client', function() {
  return del(['public/*.js', 'public/*.map', 'public/*.css', 'public/*.json']);
});

gulp.task('lint', ['clean-manifest'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('client', ['clean-client'], function() {
  var stream = browserify(/*{ debug: true }*/)
    .transform(babelify)
    .require('src/client.js', { entry: true })
    .bundle()
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer());

  if (process.env.NODE_ENV === "production") {
    stream = stream.pipe(uglify());
  }
  
  return stream.pipe(gulp.dest('public'))
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest('public/manifest.json', {base: process.cwd() + '/public', merge: true}))
    .pipe(gulp.dest('public'));
});

gulp.task('server', ['generate-manifest', 'clean-server'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('bin'));
});

gulp.task('generate-manifest', ['css'], function() {
  return gulp.src(['public/manifest.json'])
    .pipe(insert.wrap('export default ', ';\n'))
    .pipe(rename('manifest.js'))
    .pipe(gulp.dest('src'));
});

gulp.task('css', ['client'], function() {
  return gulp.src('css/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('public'))
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest('public/manifest.json', {base: process.cwd() + '/public', merge: true}))
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['lint', 'server']);
