'use strict';
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babel = require('gulp-babel');
const cleanCss = require('gulp-clean-css');
const rev = require('gulp-rev');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

gulp.task('clean-manifest', () => del(['src/manifest.js']));

gulp.task('clean-server', () => del(['bin/*.js']));

gulp.task('clean-client', () =>
  del(['public/*.js', 'public/*.map', 'public/*.css', 'public/*.json'])
);

gulp.task('client', ['clean-client'], function cleanClient() {
  const that = this;
  let stream = browserify()
    .transform(babelify)
    .require('src/client.js', { entry: true })
    .bundle()
    .on('error', (e) => {
      if (e.stack) {
        console.error(e.stack);
      } else {
        console.error(e.toString());
      }
      that.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer());

  if (process.env.NODE_ENV === 'production') {
    stream = stream.pipe(uglify());
  }

  return stream.pipe(gulp.dest('public'))
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest('public/manifest.json', { base: `${process.cwd()}/public`, merge: true }))
    .pipe(gulp.dest('public'));
});

gulp.task('server', ['generate-manifest', 'clean-server'], () =>
  gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('bin'))
);

gulp.task('generate-manifest', ['css', 'clean-manifest'], () =>
  gulp.src(['public/manifest.json'])
    .pipe(insert.wrap('export default ', ';\n'))
    .pipe(replace('"', '\''))
    .pipe(replace('\n}', ',\n}'))
    .pipe(rename('manifest.js'))
    .pipe(gulp.dest('src'))
);

gulp.task('css', ['client'], () =>
  gulp.src('css/**/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('public'))
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest('public/manifest.json', { base: `${process.cwd()}/public`, merge: true }))
    .pipe(gulp.dest('public'))
);

gulp.task('default', ['server']);
