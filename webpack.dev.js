const { merge } = require('webpack-merge')
const common = require('./webpack.config')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const useHttps = process.env.HTTPS === 'true'
const webSocketProtocol = useHttps ? 'wss' : 'ws'

module.exports = merge(common, {
  mode: 'development',
  infrastructureLogging: {
    level: 'warn',
  },
  devServer: {
    webSocketServer: 'sockjs',
    host: 'localhost',
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    client: {
      webSocketURL: 'wss://localhost:8080/ws',
      overlay: {
        runtimeErrors: (error) => {
          if (
            error.message ===
            'ResizeObserver loop completed with undelivered notifications.'
          ) {
            return false
          } else if (
            error.message ===
            'AbortSignal.timeout is not defined. Timeout will use default behavior'
          ) {
            return false
          }
          return true
        },
      },
    },
  },
  stats: 'errors-warnings',
  plugins: [new ReactRefreshWebpackPlugin()],
})
