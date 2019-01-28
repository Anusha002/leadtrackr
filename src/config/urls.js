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
        'substatus': baseUrl + 'api/Substatus',
        'task': baseUrl + 'api/Task',
        'type': baseUrl + 'api/Type',
        'stage': baseUrl + 'api/Stage',
        'users': baseUrl + 'api/Users',
        'scheduleto': baseUrl + 'api/Scheduleto',
        'getleads': baseUrl + 'api/Projects',
        'addlead': baseUrl + 'api/Projects',
        'editlead': baseUrl + 'api/Projects',
        'followups': baseUrl + 'api/Schedule',
        'addfollowup': baseUrl + 'api/Schedule',
        'completefollowup': baseUrl + 'api/Schedule'
 
    }
}