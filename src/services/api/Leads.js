import axios from 'axios'

export default {

	getLeads(payload){
		
		// return axios({ method: "GET", "url": " http://www.mocky.io/v2/5c0f1b26310000640024eacb", "data": payload, "headers": { "content-type": "application/json" } })
		return axios({ method: "GET", "url": "/api/Schedule", "data": payload, "headers": { "content-type": "application/json" } })
			.then(response => {
				console.log(response.data)
				return response.data

			})
	}
}	