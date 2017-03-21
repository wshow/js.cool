var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglifyjs');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('style', function() {
  return gulp.src('src/less/style.less')
    .pipe(less())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(uglify('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('static'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browsersync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function () { 
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/less/**/*.less', ['style']);
});

gulp.task('ico', function () { 
  gulp.src('src/favicon.ico')
    .pipe(gulp.dest('static'));
});

gulp.task('default', ['ico', 'style', 'js', 'browsersync', 'watch']);
