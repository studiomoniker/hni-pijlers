var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var zip = require('gulp-zip');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ghpages = require('gulp-gh-pages');
var inlinesource = require('gulp-inline-source');
var sass = require('gulp-sass');

// Run CSS through autoprefixed
gulp.task('css', function () {
  return gulp.src('style/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist'));
});

// Combine js
gulp.task('js', function () {
	return gulp.src(['src/lib/*.js', 'src/app.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('app-min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
	return gulp.src('src/index.html')
	.pipe(inlinesource())
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
	gulp.watch('./src/*.css', ['css']);
	gulp.watch('./src/*.js', ['html', 'js']);
});

// Default
gulp.task('default', ['all', 'watch']);

// Push to gh-pages
gulp.task('deploy', function () {
	return gulp.src('./dist/**/*')
		.pipe(ghpages());
});

// Package
gulp.task('package', ['all', 'zip']);

gulp.task('zip', function () {
	gulp.src(['src/**', 'dist/*', 'other/*'])
		.pipe(zip('Cover.zip'))
		.pipe(gulp.dest(''));
});
