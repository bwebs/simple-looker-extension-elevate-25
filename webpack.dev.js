const { merge } = require('webpack-merge')
const common = require('./webpack.config')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 8080,
    host: 'localhost',
    webSocketServer: 'sockjs',
    hot: true,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    client: {
      overlay: true,
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ],
})