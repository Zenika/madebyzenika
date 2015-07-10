var gulp = require('gulp');
var webpack = require('gulp-webpack');
var eslint = require('gulp-eslint');
var url = require('url');
var webserver = require('gulp-webserver');

var testFiles = ["./src/js/**/*.{js,jsx}","./test/**/*.test.js"];

gulp.task('webpack', function() {
  gulp.src('src/js/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lint', function () {
    return gulp.src(['src/js/**/*.{js,jsx}'])
        .pipe(eslint())
        .pipe(eslint.formatEach('stylish', process.stderr))
        .pipe(eslint.failOnError());
});

gulp.task('copy', function(){
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
  gulp.src('dist')
     .pipe(webserver({
       livereload: false,
       directoryListing: false,
       open: true,
       proxies: [
         {
           source: '/cdnjs', target: 'https://cdnjs.cloudflare.com',
           source: '/api', target: 'http://localhost:8080/api'
         }
      ]
     }));
});

gulp.task('default',['copy','webpack']);

gulp.task('serve',['lint','copy','webpack','connect']);

gulp.task('watch', function(){
  gulp.watch('src/**/*.*',['default']);
});
