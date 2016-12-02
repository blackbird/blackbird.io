var gulp = require('gulp'),
plumber = require('gulp-plumber'),
rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
cache = require('gulp-cache');
var minifycss = require('gulp-clean-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    return browserSync({
        port: 8080,
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('static', function() {
    return gulp.src(['src/*.html', 'src/*.js', 'CNAME'])
    .pipe(gulp.dest('dist/'))
});

gulp.task('images', function() {
    return gulp.src(['src/img/**/*'])
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img/'))
});

gulp.task('styles', function() {
    return gulp.src(['src/css/**/*.scss'])
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream())
});

gulp.task('scripts', function() {
    return gulp.src(['src/js/**/*.js'])
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(babel())
    // .pipe(babel({outSourceMap: true}))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('build', ['styles', 'scripts', 'images', 'static'], function() {
    gulp.src(['src/favicon.ico'])
    .pipe(gulp.dest('dist/'));
	gulp.src(['src/download/**/*']) // copy over download folder (static HTML files)
	.pipe(gulp.dest('dist/download'));
});

gulp.task('default', ['styles', 'scripts', 'images', 'static', 'browser-sync'], function() {
    gulp.src(['src/favicon.ico'])
    .pipe(gulp.dest('dist/'));

    gulp.watch('src/css/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/img/**/*', ['images']);
    gulp.watch('src/*.html', ['static']);
});
