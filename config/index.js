// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    hot: true,//自动保存
    runtimeCompiler:true
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,
    hot: true,//自动保存
    open : false,//自动启动
    host : "0.0.0.0",
    autoOpenBrowser: true,
    runtimeCompiler: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        // '/goods': 'http://localhost:3001/users'
        '/api':{
            target:'http://localhost:8088',
            changeOrigin: true,
            pathRewrite: {
              '^/api': '/api',  // 若target中没有/api、这里又为空，则404；
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
