import axios from 'axios'
import Urls from '../../config/urls.js'


export default {

addFollowup(payload){
        return axios({ method: "POST", "url": Urls.url.addfollowup, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })
    },

  getFollowups(payload){
         return axios({ method: "GET", "url": Urls.url.followups+"?ProjectId="+payload.projectId+"&Token="+payload.Token+"&UserID="+payload.UserID, "headers": { "content-type": "application/json" } })
             .then(response => {
                 return response.data
             })
     },
   editFollowup(payload){
        return axios({ method: "PUT", "url": Urls.url.completefollowup+"?ProjectID="+payload.ProjectId, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })
    },
}