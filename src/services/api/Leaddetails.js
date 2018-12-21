import axios from 'axios'

export default {

	leadDetails(payload){
			return axios({ method: "GET", "url": "http://www.mocky.io/v2/5c1709e22f00007a00b0847a", "data": payload, "headers": { "content-type": "application/json" } })
				.then(response => {
					return response.data
				})
		}
}	