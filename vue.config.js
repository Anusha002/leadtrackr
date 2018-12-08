module.exports = {
	devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'https://ltmobileapi.azurewebsites.net/',
        changeOrigin: true
        
      }
    }
  }
}