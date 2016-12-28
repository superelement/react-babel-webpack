var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

var config = require("./webpack.config.js");
config.entry.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

if(!config.plugins) config.plugins = [];
config.plugins.push( new webpack.HotModuleReplacementPlugin() );
config.plugins.push( new OpenBrowserPlugin({ url: "http://localhost:8080/" }) );

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  hot: true,
  contentBase: "src/client/public/"
});
server.listen(8080);