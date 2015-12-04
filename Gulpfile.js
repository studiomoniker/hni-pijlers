process.env.NODE_ENV = 'dev';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var inlinesource = require('gulp-inline-source');

var banner = ['  <!--',
  '    ',
  '    ',
  '    <%= pkg.name %> - <%= pkg.description %>',
  '    ',
  '    version <%= pkg.version %>',
  '    ',
  '    with love from Moniker',
  '    ',
  '    studiomoniker.com – @studiomoniker.com – github.com/studiomoniker',
  '    ',
  '    ',
  '  -->'
  ].join('\n') + '\n';

// Run CSS through autoprefixed
gulp.task('css', function () {
  return gulp.src('style/main.scss')
    .pipe($.sass({
      errLogToConsole: true
    }))
    .on('error', function (err) {
      console.log(err);
      $.notify.onError()(err.message);
      this.emit('end');
    })
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'))
    .pipe($.livereload());
});

// Combine js
new function() {
  var browserify = require('browserify');
  var babelify = require('babelify');
  var glob = require('glob');
  var source = require('vinyl-source-stream');
  var buff = require('vinyl-buffer');
  var envify = require('envify/custom');

  gulp.task('js', function () {
    var files = glob.sync('./src/**/*.js');

    return browserify({
      entries: files,
      debug: true
    })
      .transform(babelify)
      .transform(envify())
      .bundle()
      .on('error', function(err){
        this.emit('end');
        $.notify.onError()(err);
      })
      .pipe(source('main.js'))
      .pipe(buff())
      .pipe(gulp.dest('dist'))
      .pipe($.rename('main-min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('dist'));
  });
};

gulp.task('html', ['copy', 'js', 'css'], function() {
  return gulp.src('assets/index.html')
    .pipe($.header(banner, { pkg : require('./package.json') } ))
    .pipe(gulp.dest('dist/'))
    .pipe($.livereload());
});

// Copy html and assets to dist
gulp.task('copy', function () {
  return gulp.src(['assets/**/**'], {base: 'assets/'})
    .pipe(gulp.dest('dist'));
});

// All except zip
gulp.task('all', ['copy', 'html', 'js', 'css']);

// Watch
gulp.task('watch', function () {
  gulp.watch('./assets/*.html', ['html']);
  gulp.watch('./style/**/*.scss', ['css']);
  gulp.watch('./src/**/*.js', ['html', 'js']);
});

// Default
gulp.task('default', ['all', 'watch']);

// Set-production
gulp.task('set-production', function() {
  process.env.NODE_ENV = 'production';
});

// Package
gulp.task('package', ['set-production', 'all', 'inline', 'zip']);

gulp.task('inline', ['js', 'html'], function() {
  return gulp.src('dist/index.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('dist'));
});

gulp.task('zip', ['all', 'inline'], function () {
  gulp.src(['dist/index.html', 'proxy-images/**'])
    .pipe($.zip('Cover.zip'))
    .pipe(gulp.dest(''));
});
