import axios from 'axios'
import Urls from '../../config/urls.js'


export default {

addFollowup(payload){
        return axios({ method: "POST", "url": Urls.url.addfollowup, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })
    }
}