import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import webpack from 'webpack';
import { execFileSync } from 'child_process';
import packageInfo from './package.json';

const extractCss = new ExtractTextPlugin('main.css');

const headerParam = {
  project: packageInfo.name,
  description: packageInfo.description,
  commit: execFileSync(
    'git',
    [
      'log',
      '-1',
      '--date=iso',
      '--pretty=format:%cd\n             %H\n             %cn: %s'
    ]
  ),
  contact: 'info@studiomoniker.com – twitter.com/studiomoniker – github.com/studiomoniker',
  love: 'Moniker'
};

function generateHeader() {
  const toUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  let header = '';
  for (var name in headerParam) {
    if (headerParam[name]) {
      header += `    ${toUppercase(name)} – ${headerParam[name]}\n\n`;
    }
  }
  return `  <!--\n\n${header}   -->`;
}

module.exports = {
   context: __dirname,
   entry  : ['./src/app.js', './style/main.scss'],
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
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'url'
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
      new CopyWebpackPlugin(
        [
          { from: 'assets' }
        ],
        {
          ignore: [
            '*.woff',
            '*.woff2',
            '*.ttf',
            '*.otf',
            { dot: false }
          ]
        }
      ),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: false,
        header: generateHeader(),
        title: packageInfo.description + ' by Moniker'
      })
   ]
};
