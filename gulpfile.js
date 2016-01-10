'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	jade = require('gulp-jade'),
	spritesmith = require('gulp.spritesmith'),
	plumber = require('gulp-plumber');


/* --------- paths --------- */
var paths = {
	sass: {
		src: 'src/sass/**/*.scss',
		location: 'src/sass/main.scss',
		destination: 'www/css'
	},

	js: {
		src: 'src/js/**/*.js',
		destination: 'www/js'
	},

	jade: {
		src: 'src/jade/**/*.jade',
		location: 'src/jade/*.jade',
		destination: 'www'
	}
};


/* ----- jade ----- */
gulp.task('jade-compile', function () {
	gulp.src(paths.jade.location)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t'
		}))
		.pipe(gulp.dest(paths.jade.destination))
});


/* ------ sass ------ */
gulp.task('sass-compile', function () {
	gulp.src(paths.sass.location)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
//		.pipe(autoprefixer(['> 5%', 'last 5 versions', 'IE 9']))
		.pipe(concat("main.min.css"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.sass.destination));
});


/* -------- concat js -------- */
gulp.task('concat-js', function () {
	return gulp.src(paths.js.src)
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.js.destination));
});


/* -------- auto sprites  -------- */
gulp.task('sprite', function () {
	var spriteData = gulp.src('src/img/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			imgPath: '../img/sprite.png',
			cssName: 'sprite.scss',
			padding: 20,
			algorithm: 'left-right'
		}));
	spriteData.img.pipe(gulp.dest('www/img/'));
	spriteData.css.pipe(gulp.dest('src/sass/'));
});


/* -------- gulp server  -------- */
gulp.task('server', function () {
	browserSync({
		port: 9000,
		browser: ['google chrome'],
		server: {
			baseDir: 'www'
		}
	});
});


/* -------- gulp watching  -------- */
gulp.task('watch', function () {
	gulp.watch(paths.jade.src, ['jade-compile']);
	gulp.watch(paths.sass.src, ['sass-compile']);
	gulp.watch(paths.js.src, ['concat-js']);
	gulp.watch([
		'www/*.html',
		'www/css/*.css',
		paths.js.src
	]).on('change', browserSync.reload);
});


gulp.task('default', [
	'jade-compile',
	'sass-compile',
	'concat-js',
	'server',
	'watch'
]);