const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

gulp
    .task('copy-html', () => {
      return gulp
          .src(['src/**/*.html'])
          .pipe(gulp
              .dest('dist/'));
    });

gulp
    .task('copy-css', () => {
      return gulp
          .src(['src/**/*.css'])
          .pipe(gulp
              .dest('dist/'));
    });

gulp
    .task('webpack', () => {
      return webpack(webpackConfig, (err, stats) => {
        if (err) throw new Error('Webpack: ' + err);
      });
    });

gulp
    .task('build', () => {
      gulp.start( 'webpack', 'copy-html', 'copy-css');
    });
