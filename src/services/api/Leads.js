import axios from 'axios'
import Urls from '../../config/urls.js'


export default {

	getLeads(payload){
		
		return axios({ method: "GET", "url": Urls.url.schedule+"?fromDate="+ payload.fromDate+"&toDate="+payload.toDate+"&Token="+payload.Tk, "data": payload, "headers": { "content-type": "application/json" } })
			.then(response => {
				var dt = response.data.Body;
				var cards = {}
				for(var i=0; i<dt.length; i++)
				{
				
					var dtobj = new Date(dt[i].FollowupDate)

					var dateString = dtobj.getTime();
					if(typeof cards[dateString] == "undefined"){
						cards[dateString] = [];
					}

					cards[dateString].push(dt[i]);
				}
				
				return cards


			})
	},
	getLeaddetails(payload){
			return axios({ method: "GET", "url": "http://www.mocky.io/v2/5c18ca372f00005700af1197", "data": payload, "headers": { "content-type": "application/json" } })
				.then(response => {
					return response.data
				})
		}

	
}	