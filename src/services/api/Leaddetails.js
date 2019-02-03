import axios from 'axios'
import Urls from '../../config/urls.js'
import Utils from './Utils.js'

export default {

	leadDetails(payload){
			return axios({ method: "GET", "url": Urls.url.getleads + "?ProjectID=" + payload.ProjectID + "&Token=" + payload.Token ,  "headers": { "content-type": "application/json" } })
				.then(response => {
					return response.data
				})
		}
}	