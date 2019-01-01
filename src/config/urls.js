let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
   baseUrl = 'https://ltmobileapi.azurewebsites.net/'
} else {
   baseUrl = '/'
}

export default {
    'name': "Urls",
    'url': {
        'login': baseUrl + 'api/login',
        'logout': baseUrl + 'api/logout'

    }
}