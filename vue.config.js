module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://ltmobileapi.azurewebsites.net/'
    : '/',

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