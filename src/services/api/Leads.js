import axios from 'axios'
import Urls from '../../config/urls.js'


export default {

	getTasks(payload){
		
		return axios({ method: "GET", "url": Urls.url.schedule+"?fromDate="+ payload.fromDate+"&toDate="+payload.toDate+"&Token="+payload.Token, "data": payload, "headers": { "content-type": "application/json" } })
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
	getFollowups(payload){
			return axios({ method: "GET", "url": Urls.url.followups+"?projectId=2000002&Token=409bd21a-c89f-4cba-8ac9-c6ebd706b7f6", "data": payload, "headers": { "content-type": "application/json" } })
				.then(response => {
					return response.data
				})
		},
	getLeads(payload){
			return axios({ method: "GET", "url": Urls.url.getleads+"?Token=409bd21a-c89f-4cba-8ac9-c6ebd706b7f6&UserID=2", "data": payload, "headers": { "content-type": "application/json" } })
				.then(response => {
					return response.data
				})
		},	
	
	addLead(payload){
        return axios({ method: "POST", "url": Urls.url.addlead, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })
    }

	
}	