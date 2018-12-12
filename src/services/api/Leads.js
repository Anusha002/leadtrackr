import axios from 'axios'

export default {

	getLeads(payload){
		
		// return axios({ method: "GET", "url": " http://www.mocky.io/v2/5c0f1b26310000640024eacb", "data": payload, "headers": { "content-type": "application/json" } })
		return axios({ method: "GET", "url": "/api/Schedule?fromDate="+ payload.fromDate+"&toDate="+payload.toDate+"&Tk="+payload.Tk, "data": payload, "headers": { "content-type": "application/json" } })
			.then(response => {
				var dt = response.data.Body;
				var cards = {}
				for(var i=0; i<dt.length; i++)
				{
					// console.log(new Date(dt[i].FollowupDate))
					var dtobj = new Date(dt[i].FollowupDate)
					var dateString = dtobj.getDate().toString() + dtobj.getMonth().toString() + dtobj.getFullYear().toString();
					if(typeof cards[dateString] == "undefined"){
						cards[dateString] = [];
					}
					cards[dateString].push(dt[i]);
				}
				console.log(cards)
				return cards


			})
	}
}	