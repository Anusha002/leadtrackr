<template>
	<v-ons-page id="tasklistpage">
		<div>
			<v-ons-row v-for="(value, key) in leads">	
				<v-ons-row>{{convertDate(key)}}</v-ons-row>	
				<v-ons-list>
					<v-ons-list-item  v-for="(card, index) in value">
						<v-ons-row>
							<v-ons-col id="ld-comp-name">{{card.ProjectName}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>
							<v-ons-col id="ld-stage" >{{card.Stage}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{card.ContactName}}</v-ons-col>
						</v-ons-row>
						<v-ons-row style="margin-top: 10px;">
							<v-ons-col width="50px">
								<a :href="'tel:' + ContactMobile">
									<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
								</a>
							</v-ons-col>
							<v-ons-col>
								<a :href="'mailto:' + ContactEmail">
									<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
								</a>
							</v-ons-col>
						</v-ons-row>
					</v-ons-list-item>
				</v-ons-list>
			</v-ons-row>
		</div>
	</v-ons-page>
</template>

<script>

import GetTasksAPI from '../services/api/Leads.js';

export default {
	name: 'tasklist',
	data() {
		return {
			leads: {},
			dtobj:{}
		}				
	 },
	 methods:{
	 	convertDate(date){
	 		var months =  [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	 		var dtobj = new Date(parseInt(date));
	 		var dt = dtobj.getDate();
	 		if(dt == 1) {
	 			dt += 'st'
	 		} else if(dt == 2) {
	 			dt += 'nd'
	 		} else if(dt == 3) {
	 			dt += 'rd'
	 		} else {
	 			dt += 'th'
	 		}
	 		
	 		return dt + ' ' + months[dtobj.getMonth()] + ' ' + dtobj.getFullYear(); 


	 		

	 	}
	 },
	 mounted:function() {	
	 	var payload = {
	 		fromDate: '01-01-2018',
	 		toDate: '12-12-2018',
	 		Token:localStorage.ki
	 	}
 	  	GetTasksAPI.getTasks(payload).then(leads => {
 	  		var dates =  Object.keys(leads);
 	  		
 	  		this.leads = leads;
 	  		console.log(leads);

 	  	})
 	  }
 	 }	
			
	
</script> 
<style scoped>
	
.toolbar {
	background: transparent;
}
.fab {
	background: #14BA88 !important;
}
.fab .ons-icon{
	color: #fff;
}
.list {
	border-radius: 10px;
	width: 90%;
    margin: 20px;
}
#ld-comp-name {
	font-size: 16px;
	font-weight: 500;
	color:#333;
}
#ld-stage {
	color: #08976C;
	font-size: 13px;
	height: 30px;
}
#ld-name {
	font-size: 15px;
	color: #444;
}
.ons-icon.fa {
	font-size: 1.4em;
	color: #333;
}
</style>