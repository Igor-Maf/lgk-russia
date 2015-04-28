'use strict';

var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify');

gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	})
});

gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(gulp.dest('app/'))
		.pipe(connect.reload());
});

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

gulp.task('js', function() {
	gulp.src('js/*.js')
		.pipe(jshint())
        .pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('app/js/'))
		.pipe(connect.reload());
})

gulp.task('images', function() {
	gulp.src('images/**')
		.pipe(gulp.dest('app/images/'))
		.pipe(connect.reload());
});


gulp.task('fonts', function() {
	gulp.src('fonts/**')
		.pipe(gulp.dest('app/fonts/'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('*.html', ['html'])
	gulp.watch('scss/**/*.scss', ['css'])
	gulp.watch('js/**/*.js', ['js'])
	gulp.watch('images/**', ['images'])
	gulp.watch('fonts/**', ['fonts'])
})

gulp.task('default', ['connect', 'html', 'css', 'js', 'images', 'fonts', 'watch']);