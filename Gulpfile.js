var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

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
	return gulp.src('src/*.js')
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

// Watch
gulp.task('default', function () {
	gulp.watch('src/**/*.css', ['css']);
	gulp.watch('src/**/*.js', ['jsconcat', 'jsmin']);
});

// Package
gulp.task('zip', function () {
	gulp.run('css', 'jsconcat', 'jsmin');
	gulp.src('dist/*', 'other/*')
		.pipe(zip('Cover.zip'))
		.pipe(gulp.dest('dist'));
});
