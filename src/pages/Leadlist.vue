<template>
	<v-ons-page id="leadlistpage">
		<v-ons-toolbar>
			<div class="left">
				<v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
			</div>
		</v-ons-toolbar>
		<v-ons-card>
			<div class="content">
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
			</div>
		</v-ons-card>
	</v-ons-page>
</template>

<script>
import GetLeadsAPI from '../services/api/Leads.js';
export default {
	
	data() {
		return {
			leads: {},
			items: []
		}				
	},
	methods:{
  	 	getCards(date){
  	 		var dtStr = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString();
  	 		this.items = this.leads[dtStr];	
 	 		}
		},
		mounted:function() {

 	  	GetLeadsAPI.getLeads({}).then(leads => {

			var dates =  Object.keys(leads)
			var newLeads = {};
			var dots = []
			for (var i=0; i<dates.length; i++) {
				var dtobj = new Date(parseInt(dates[i])*1000)
				dots[i] = dtobj
				var dtStr = dtobj.getDate().toString() + dtobj.getMonth().toString() + dtobj.getFullYear().toString();
				
				newLeads[dtStr] = leads[dates[i]]
				
			}
			this.leads = newLeads;

			this.attributes[1].dates = dots;
			var currentdate = new Date();
			this.getCards(currentdate);
			})
 	 	}
	}
</script> 