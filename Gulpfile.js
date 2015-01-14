var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var zip = require('gulp-zip');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ghpages = require('gulp-gh-pages');

// Run CSS through autoprefixed
gulp.task('css', function () {
	return gulp.src('src/app.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('dist'));
});

// Combine js
gulp.task('jsconcat', function () {
	return gulp.src(['src/lib/*.js', 'src/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist'));
});

// Minify js
gulp.task('jsmin', function () {
	return gulp.src('dist/app.js')
		.pipe(rename('app-min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// Copy html and assets to dist
gulp.task('copy', function () {
	return gulp.src(['src/index.html', 'src/assets/**/**'], {base: 'src/'})
		.pipe(gulp.dest('dist'));
});

// All except zip
gulp.task('all', ['copy', 'jsconcat', 'jsmin', 'css']);

// Watch
gulp.task('watch', function () {
	gulp.watch('./src/*.css', ['css']);
	gulp.watch('./src/*.js', ['jsconcat', 'jsmin']);
});

// Default
gulp.task('default', ['all', 'watch']);

// Push to gh-pages
gulp.task('deploy', function () {
	return gulp.src('./dist/**/*')
		.pipe(ghpages());
});

// Package
gulp.task('zip', function () {
	gulp.start('all');
	gulp.src(['dist/*', 'other/*'])
		.pipe(zip('Cover.zip'))
		.pipe(gulp.dest(''));
});
