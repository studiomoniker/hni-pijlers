process.env.NODE_ENV = 'dev';

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import inlinesource from 'gulp-inline-source';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.babel.js';
import saveLicense from 'uglify-save-license';

const $ = loadPlugins();

gulp.task('package:webpack', (callback) => {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        comments: saveLicense
    })
  );

  // run webpack
  webpack(myConfig, (err, stats) => {
    if (err)
      throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]',
      stats.toString({ colors: true })
    );
    callback();
  });
});

gulp.task('webpack-dev-server', () => {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);

  // Inline support for live reloading:
  myConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080/');

  myConfig.devtool = 'source-map';
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig),
    {
      publicPath: '/dist/',
      stats: {
        colors: true
      }
    }
  ).listen(8080, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log(
      '[webpack-dev-server]',
      'http://localhost:8080/webpack-dev-server/dist/'
    );
  });
});

// Set-production
gulp.task('set-production',
  () => process.env.NODE_ENV = 'production'
);

gulp.task('package:inline',
  [
    'package:webpack'
  ],
  () => {
    return gulp.src('dist/index.html')
      .pipe(inlinesource({
        compress: false // Leave compressing to webpack
      }))
      .pipe(gulp.dest('dist'));
  }
);

gulp.task('package:zip',
  [
    'package:webpack',
    'package:inline'
  ],
  () => {
    gulp.src(['dist/index.html', 'proxy-images/**'])
      .pipe($.zip(`Cover-${require('./package.json').name}.zip`))
      .pipe(gulp.dest(''));
  }
);

gulp.task('package',
  [
    'set-production',
    'package:webpack',
    'package:inline',
    'package:zip'
  ]
);

// Default
gulp.task('default',
  ['webpack-dev-server']
);
