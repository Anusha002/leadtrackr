import axios from 'axios'

export default {
    getStatus(payload){
        return axios({ method: "GET", "url": "http://www.mocky.io/v2/5c1205563300005700998cb0", "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })

    }
}