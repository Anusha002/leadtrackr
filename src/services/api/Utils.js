import axios from 'axios'

export default {
    getStatus(payload){
        return axios({ method: "GET", "url": "/api/status?Token=88f78a0c-ea20-4e59-81a0-23b8178255b9", "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getType(payload){
        return axios({ method: "GET", "url": "/api/Type?Token=dccd6924-3152-4658-88d9-a74bce5f10e0", "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getUser(payload){
        return axios({ method: "GET", "url": "http://www.mocky.io/v2/5c1361033400008200ecdfbf", "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    }
}