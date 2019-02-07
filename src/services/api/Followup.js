import axios from 'axios'
import Urls from '../../config/urls.js'
import Utils from './Utils.js'

export default {

addFollowup(payload){
        return axios({ method: "POST", "url": Urls.url.addfollowup+"?UserID="+Utils.getUserid(), "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            },
            error => {
                return error;
            })    
    },

  getFollowups(payload){
         return axios({ method: "GET", "url": Urls.url.followups+"?ProjectId="+payload.projectId+"&Token="+payload.Token+"&UserID="+payload.UserID, "headers": { "content-type": "application/json" } })
             .then(response => {
                 return response.data
             },
              error => {
                return error;
            }) 
     },
   editFollowup(payload){
        var that =  this;
        return axios({ method: "PUT", "url": Urls.url.completefollowup+"?ProjectID="+Utils.getProjectid()+"&UserID="+Utils.getUserid(), "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                console.log(response.data); 
                return response.data

            },
            error => {
                return error;
            }) 
    }
}