import axios from 'axios'
import Urls from '../../config/urls.js'

export default {

	getUser(payload){
		return axios({ method: "POST", "url": Urls.url.login, "data": payload, "headers": { "content-type": "application/json" } })
			.then(response => {
				return response.data
			})
	},
	login(payload){
		return axios({ method: "POST", "url": Urls.url.login, "data": payload, "headers": { "content-type": "application/json" } })
			.then(response => {
				return response.data
			})
	},
	logout(payload){
		return axios({ method: "POST", "url": Urls.url.logout, "data": payload, "headers": { "content-type": "application/json" } })
			.then(response => {
				return response.data
			})
	}
	

}