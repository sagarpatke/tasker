const gulp = require('gulp');
const webpack = require('gulp-webpack');
const clean = require('gulp-clean');
const flatten = require('gulp-flatten');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const minifyHtml = require('gulp-minify-html');
const config = require('./webpack.config');

gulp.task('build:react',['clean'],function() {
  return gulp.src('client/*')
    .pipe(webpack(config))
    .pipe(uglify())
    .pipe(gulp.dest('client/assets'));
});

gulp.task('build:html',['clean','build:react'],function() {
  return gulp.src('client/*.html')
    .pipe(usemin({
      assetsDir: 'client',
      css: [minifyCss(),'concat'],
      js: [uglify(), 'concat'],
      html: [minifyHtml({empty: true})]
    }))
    .pipe(gulp.dest('server/public'));
});

gulp.task('build:fonts',['clean'],function() {
  return gulp.src('client/**/*.woff')
    .pipe(flatten())
    .pipe(gulp.dest('server/public/fonts'))
});

gulp.task('build:icons',['clean'],function() {
  return gulp.src('client/**/*.png')
    .pipe(flatten())
    .pipe(gulp.dest('server/public/icons'))
});

gulp.task('clean',function(cb) {
  return gulp.src('server/public',{read:false})
  .pipe(clean({force:true}));
});

gulp.task('build',['build:react','build:fonts','build:icons','build:html']);

gulp.task('default',['build']);
