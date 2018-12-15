import axios from 'axios'

export default {
    getStatus(payload){
        return axios({ method: "GET", "url": "http://www.mocky.io/v2/5c1205563300005700998cb0", "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    },
    getType(payload){
        return axios({ method: "GET", "url": "http://www.mocky.io/v2/5c124c5f330000cd2b998e70", "data": payload, "headers": { "content-type": "application/json" } })
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