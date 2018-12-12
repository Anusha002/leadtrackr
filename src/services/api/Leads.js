import axios from 'axios'

export default {

	getLeads(payload){
		
		// return axios({ method: "GET", "url": "http://www.mocky.io/v2/5c108b9f2e0000ea0655b535", "data": payload, "headers": { "content-type": "application/json" } })
		return axios({ method: "GET", "url": "/api/Schedule?fromDate="+ payload.fromDate+"&toDate="+payload.toDate+"&Tk="+payload.Tk, "data": payload, "headers": { "content-type": "application/json" } })
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

				// return response.data


			})
	}
}	