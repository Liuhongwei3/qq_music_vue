module.exports = {
  devServer: {
    proxy: {
      // 匹配所有以api开头的请求路径
      '/api': {
        target: 'http://localhost:3003',
        ws: true,
        changeOrigin: true,
        secure: false,
        // 把api替换掉
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}