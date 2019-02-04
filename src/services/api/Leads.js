import axios from 'axios'
import Urls from '../../config/urls.js'
import Utils from './Utils.js'


export default {

	getTasks(payload){
		
		return axios({ method: "GET", "url": Urls.url.schedule+"?fromDate="+ payload.fromDate+"&toDate="+payload.toDate+"&Token="+payload.Token+"&UserID="+payload.UserID, "data": payload, "headers": { "content-type": "application/json" } })
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


			},
			error => {
                return error;
            }) 
	},
	
	getLeads(payload){
			return axios({ method: "GET", "url": Urls.url.getleads+"?Token="+payload.Token+"&UserID="+Utils.getUserid(), "data": payload, "headers": { "content-type": "application/json" } })
				.then(response => {
					return response.data
				},
				error => {
                return error;
            }) 
		},	
	
	addLead(payload){
        return axios({ method: "POST", "url": Urls.url.addlead, "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })
    },
    editLead(payload){
        return axios({ method: "PUT", "url": Urls.url.editlead+"?UserID="+Utils.getUserid()+"&ProjectID="+Utils.getProjectid(), "data": payload, "headers": { "content-type": "application/json" } })
            .then(response => {
                return response.data
            })
    }

	
}	