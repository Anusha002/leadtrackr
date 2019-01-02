import axios from 'axios'
import Urls from '../../config/urls.js'

export default {
    getStatus(payload){
        return axios({ method: "GET", "url": Urls.url.status+"?Token=88f78a0c-ea20-4e59-81a0-23b8178255b9", "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getType(payload){
        return axios({ method: "GET", "url": Urls.url.type+"?Token=dccd6924-3152-4658-88d9-a74bce5f10e0", "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getUser(payload){
        return axios({ method: "GET", "url": Urls.url.users+"?Token=409bd21a-c89f-4cba-8ac9-c6ebd706b7f6", "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    addLead(payload){
        return axios({ method: "POST", "url": Urls.url.addlead, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })
    },
}