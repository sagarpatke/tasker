const path = require('path');

module.exports = {
  entry: {
    app: [path.join(__dirname,'client','app.jsx')]
  },
  output: {
    path: path.join(__dirname,'client','assets'),
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel',
      query: {
        presets: ['es2015','stage-1','react']
      }
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.json$/,
      loader: "json"
    }]
  },
  resolve: {
    extensions: ['','.js','.jsx','/index','/index.js','/index.jsx']
  },
  plugins: []
}
