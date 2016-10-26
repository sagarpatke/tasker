const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const path = require('path');

const port = process.env.PORT || 8080

const config = require('./webpack.config');
config.entry.app.unshift('webpack-dev-server/client?http://localhost:'+port,'webpack/hot/dev-server');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: path.join(__dirname,'client'),
  publicPath: config.output.publicPath,
  setup: function(app) {
    require('./server/db');
    app.use(require('./server/api/api.router'));
  }
});

server.listen(port);
