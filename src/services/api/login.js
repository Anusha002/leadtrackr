import axios from 'axios'

export default {

	getUser(payload){
		return axios({ method: "POST", "url": "/api/login", "data": payload, "headers": { "content-type": "application/json" } })
			.then(response => {
				return response.data
			})
	}
}