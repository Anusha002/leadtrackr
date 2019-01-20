import axios from 'axios'
import Urls from '../../config/urls.js'

export default {
    getStatus(payload){
        return axios({ method: "GET", "url": Urls.url.status+"?Token="+payload.Token, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getSubstatus(payload){
        return axios({ method: "GET", "url": Urls.url.substatus+"?Token="+payload.Token, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getType(payload){
        return axios({ method: "GET", "url": Urls.url.type+"?Token="+payload.Token, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getStage(payload){
        return axios({ method: "GET", "url": Urls.url.stage+"?Token="+payload.Token+"&Department="+payload.Department, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getTask(payload){
        return axios({ method: "GET", "url": Urls.url.task+"?Token="+payload.Token+"&UserID="+payload.UserID, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getUser(payload){
        return axios({ method: "GET", "url": Urls.url.users+"?Token="+payload.Token, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getScheduleto(payload){
        return axios({ method: "GET", "url": Urls.url.scheduleto+"?ProjectID="+payload.ProjectID, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    formatDate(date) {
        var m = (1 + date.getMonth()).toString();
        m = (m.length > 1 ) ? m : '0' + m;
        var d = date.getDate().toString();
        d = (d.length > 1 ) ? d : '0' + d;
        return m + '-' + d + '-' + date.getFullYear();
    },
    readableDate(date) {
        var m = (1 + date.getMonth()).toString();
        m = (m.length > 1 ) ? m : '0' + m;
        var d = date.getDate().toString();
        d = (d.length > 1 ) ? d : '0' + d;
        return d + '/'+ m + '/' + date.getFullYear();
    },
    getUserid() {  
        return JSON.parse(localStorage.getItem('usr')).UserID.toString();
    },
    getUsername() {  
        return JSON.parse(localStorage.getItem('usr')).FullName.toString();
    },
    getProjectid() {  
        return JSON.parse(localStorage.getItem('project')).ProjectID.toString();
    }
   
}