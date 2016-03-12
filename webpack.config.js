var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var webpack = require('webpack');

var extractCss = new ExtractTextPlugin('main.css');
var extractHtml = new ExtractTextPlugin('index.html');

module.exports = {
   context: __dirname,
   entry  : ['./src/app.js', './style/main.scss', './assets/index.html'],
   output : {
      path    : __dirname + '/dist',
      filename : 'main.js'
   },
   module : {
      loaders: [
        {
           test  : /.js$/,
           loader : 'babel-loader',
           query: {
            presets: ['es2015']
           }
        },
        {
           test: /\.json$/,
           loader: 'json-loader'
        },
        {
          test: /\.scss$/,
          loader: extractCss.extract('style', 'css!postcss-loader!sass')
        },
        {
           test: /index\.html$/,
           loader: extractHtml.extract('html')
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader'
        }
      ]
   },
   postcss: function () {
      return [
        autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }),
        precss
      ];
   },
   plugins: [
       new webpack.DefinePlugin({
        'process.env': Object
          .keys(process.env)
          .reduce(function(o, k) {
            o[k] = JSON.stringify(process.env[k]);
            return o;
          }, {})
        }),
      extractCss,
      extractHtml,
      new CopyWebpackPlugin(
        [
          { from: 'assets' }
        ],
        {
           ignore: [
              'index.html',
              { dot: false }
           ]
        }
      )
   ]
};
