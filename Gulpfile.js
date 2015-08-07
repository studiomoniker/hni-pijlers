var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var inlinesource = require('gulp-inline-source');

// Run CSS through autoprefixed
gulp.task('css', function () {
  return gulp.src('src/style/*.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});

// Combine js
new function() {
  var browserify = require('browserify')
  var babelify = require('babelify')
  var glob = require('glob')
  var source = require('vinyl-source-stream')
  var buff = require('vinyl-buffer')

  gulp.task('js', function () {
    var files = glob.sync('./src/js/**/*.js');

    return browserify({
        entries: files,
        debug: true
      })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buff())
        .pipe(gulp.dest('dist'))
        .pipe($.rename('app-min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('dist'));
  });
}

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
})

// Copy html and assets to dist
gulp.task('copy', function () {
  return gulp.src(['src/assets/**/**'], {base: 'src/'})
    .pipe(gulp.dest('dist'));
});

// All except zip
gulp.task('all', ['copy', 'html', 'js', 'css']);

// Watch
gulp.task('watch', function () {
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/**/*.scss', ['css']);
  gulp.watch('./src/**/*.js', ['html', 'js']);
});

// Default
gulp.task('default', ['all', 'watch']);

// Package
gulp.task('package', ['all', 'inline', 'zip']);

gulp.task('inline', ['js', 'html'], function() {
  return gulp.src('dist/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('dist'));
})

gulp.task('zip', ['all', 'inline'], function () {
  gulp.src(['dist/**/*', 'other/**/*'])
    .pipe($.zip('Cover.zip'))
    .pipe(gulp.dest(''));
});
