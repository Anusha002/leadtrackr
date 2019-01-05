<template>
	<v-ons-page id="leadlistpage">	
		<h1>Lead List</h1>	
		<div>
			<v-ons-card v-for="(value, key) in leads">
					<div class="content">
						<v-ons-row>
							<v-ons-col id="ld-comp-name">{{value.LeadName}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>
							<v-ons-col id="ld-status" >{{value.Stage}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{value.ContactPerson}}</v-ons-col>
						</v-ons-row>
						<v-ons-row style="margin-top: 10px;">
							<v-ons-col width="50px">
								<a :href="'tel:' + value.Mobile">
									<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
								</a>
							</v-ons-col>
							<v-ons-col>
								<a :href="'mailto:' + value.Email">
									<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
								</a>
							</v-ons-col>

						</v-ons-row>
					</div>
				</v-ons-card>
		</div>
	</v-ons-page>
</template>

<script>

import GetLeadsAPI from '../services/api/Leads.js';

export default {
	name: 'leadlist',
	data() {
		return {
			leads: []
		}				
	 },
	 methods:{
	 },
	 mounted:function() {	
	 	var payload = {
	 		Token:localStorage.ki
	 	}
 	  	GetLeadsAPI.getLeads(payload).then(leads => {
   		
 	  		this.leads = leads.Body;
 	  		console.log(this.leads);


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
#ld-status {
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