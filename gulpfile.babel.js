process.env.NODE_ENV = 'dev';

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import inlinesource from 'gulp-inline-source';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';
import { name } from './package.json';

const $ = loadPlugins();
const banner = `  <!--
    
    
    <%= pkg.name %> - <%= pkg.description %>
    
    version <%= pkg.version %>
    
    with love from Moniker
    
    studiomoniker.com – @studiomoniker.com – github.com/studiomoniker
    
    
  -->`;


gulp.task('package:webpack', (callback) => {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
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

  myConfig.devtool = 'eval';
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
      'http://localhost:8080/dist/'
    );
  });
});

gulp.task('package:html',
  [ 'package:webpack' ],
  () => {
    return gulp.src('dist/index.html')
      .pipe($.header(banner, { pkg : require('./package.json') } ))
      .pipe(gulp.dest('dist/'));
  }
);

// Set-production
gulp.task('set-production',
  () => process.env.NODE_ENV = 'production'
);

gulp.task('package:inline',
  [
    'package:webpack',
    'package:html'
  ],
  () => {
    return gulp.src('dist/index.html')
      .pipe(inlinesource())
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
      .pipe($.zip('Cover-' + name + '.zip'))
      .pipe(gulp.dest(''));
  }
);

gulp.task('package',
  [
    'set-production',
    'package:webpack',
    'package:inline',
    'package:html',
    'package:zip'
  ]
);

// Default
gulp.task('default',
  ['webpack-dev-server']
);
