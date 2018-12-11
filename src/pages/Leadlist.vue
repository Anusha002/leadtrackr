<template>
	<v-ons-page id="leadlistpage">
		<v-ons-toolbar>
			<div class="left">
				<v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
			</div>
		</v-ons-toolbar>
		<v-ons-list v-for="(value, key) in leadlist">
		  <v-ons-card>
				<v-ons-row>
					<v-ons-col id="ld-comp-name">{{value.lead_name}}</v-ons-col>
				</v-ons-row>
				<v-ons-row>
					<v-ons-col id="ld-status" >{{value.status}}</v-ons-col>
				</v-ons-row>
				<v-ons-row>	
					<v-ons-col id="ld-name" >{{value.contact_name}}</v-ons-col>
				</v-ons-row>
				<v-ons-row style="margin-top: 10px;">
					<v-ons-col width="50px">
						<a :href="'tel:' + value.phone">
							<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
						</a>
					</v-ons-col>
					<v-ons-col>
						<a :href="'mailto:' + value.email">
							<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
						</a>
					</v-ons-col>
				</v-ons-row>
		</v-ons-card>
	</v-ons-list>
	</v-ons-page>
</template>

<script>

import GetLeadsAPI from '../services/api/Leads.js';

export default {
	name: 'leadlist',
	data() {
		return {
			leadlist: []	
		}				
	 },
	 methods:{
	 },
	 mounted:function() {	
 	  	GetLeadsAPI.getLeads({}).then(leads => {
 	  		var dates =  Object.keys(leads);
 	  		this.leadlist = leads;	

 	  	})
 	  }
 	 }	
			
	
</script> 