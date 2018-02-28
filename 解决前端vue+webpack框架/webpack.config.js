var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ],
  },
  babel: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
  },
  vue: {
      postcss: [
          require('autoprefixer')()
      ]
  },
  postcss: [
      require('autoprefixer')(),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
    devtool: 'cheap-module-source-map'
  // devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}

