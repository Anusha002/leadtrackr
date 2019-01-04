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
        'logout': baseUrl + 'api/logout',
        'schedule': baseUrl + 'api/Schedule',
        'status': baseUrl + 'api/status',
        'type': baseUrl + 'api/Type',
        'stage': baseUrl + 'api/Stage',
        'users': baseUrl + 'api/Users',
        'addlead': baseUrl + 'api/Projects',
        'followups': baseUrl + 'api/Projects',
        'addfollowup': baseUrl + 'api/Schedule'
 
    }
}