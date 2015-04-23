'use strict';

var gulp = require('gulp'),
	concatCSS = require('gulp-concat-css'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer');


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
	gulp.src('css/**/*.css')
		.pipe(concatCSS('style.css'))
		.pipe(autoprefixer())
		.pipe(minifyCSS())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(connect.reload());
		//.pipe(notify('Done!'));
});

// images
gulp.task('images', function() {
	gulp.src('images/**')
		.pipe(gulp.dest('app/images'))
});

// fonts
gulp.task('fonts', function() {
	gulp.src('fonts/**')
		.pipe(gulp.dest('app/fonts/'))
});

// watch
gulp.task('watch', function() {
	gulp.watch('css/**/*.css', ['css'])
	gulp.watch('*.html', ['html'])
})

// default
gulp.task('default', ['connect', 'html', 'css', 'images', 'fonts', 'watch']);