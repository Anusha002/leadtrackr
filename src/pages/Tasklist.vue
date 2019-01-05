<template>
	<v-ons-page id="tasklistpage">
		<div>
			<v-ons-row v-for="(value, key) in leads" v-bind:key="key">	
				<div class="date-header">{{convertDate(key)}}</div>	
				<v-ons-list class="list">
					<v-ons-list-item  v-for="(card, index) in value" v-bind:key="index">
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
								<a :href="'tel:' + card.ContactMobile"v-show="card.ContactMobile != ''">
									<v-ons-icon modifier="small" class="icon-phone"></v-ons-icon>
								</a>
							</v-ons-col>
							<v-ons-col>
								<a :href="'mailto:' + card.ContactEmail" v-show="card.ContactEmail != ''">
									<v-ons-icon modifier="small" class="icon-email"></v-ons-icon>
								</a>
							</v-ons-col>
						</v-ons-row>
					</v-ons-list-item>
				</v-ons-list>
			</v-ons-row>
		</div>
		<v-ons-fab position="bottom right" ripple id="add-fab" @click="goTodetail()">
     		 <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
    	</v-ons-fab>
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
		goTodetail() {
   			this.$router.push('/addlead')
  		},
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
		 this.leads = JSON.parse(localStorage.getItem('lds'));
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
.date-header {
	color: #fff;
	font-size: 1em;
	margin-left: 12px;
	margin-top: 20px;
	font-weight: 500;
}
.list{
	margin: 10px !important;
	width: 98%;
}
</style>