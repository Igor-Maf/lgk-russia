'use strict';

var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps');


// server connect
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	})
});


// html
gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(gulp.dest('app/'))
		.pipe(connect.reload());
});


// css
gulp.task('css', function() {
	gulp.src('scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer())
		.pipe(minifyCSS())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('app/css/'))
		.pipe(connect.reload());
});


// images
gulp.task('images', function() {
	gulp.src('images/**')
		.pipe(gulp.dest('app/images/'))
		.pipe(connect.reload());
});


// fonts
gulp.task('fonts', function() {
	gulp.src('fonts/**')
		.pipe(gulp.dest('app/fonts/'))
		.pipe(connect.reload());
});


// watch
gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['css'])
	gulp.watch('*.html', ['html'])
	gulp.watch('images/**', ['images'])
	gulp.watch('fonts/**', ['fonts'])
})


// default
gulp.task('default', ['connect', 'html', 'css', 'images', 'fonts', 'watch']);