<template>
	<v-ons-page id="leadlistpage">	
		<v-ons-progress-bar :value="progress"></v-ons-progress-bar>
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button @click="toggleMenu()">
	        		<v-ons-icon class="icon-hamburger header-icon"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="center">
    			Leads List
	        </div>	
	       
 		</v-ons-toolbar>
    		<v-ons-search-input class="searchlead" placeholder="Search for lead/LeadID" v-model="query" v-on:keyup="searchLead()">		
    		</v-ons-search-input>
		<div>
			<v-ons-card v-for="(value, key) in leads" v-bind:key="key" @click="goToFollowup(value)">
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
		<v-ons-fab position="bottom right" ripple id="add-fab" @click="goToaddlead()">
     		 <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
    	</v-ons-fab>
	</v-ons-page>
</template>

<script>

import GetLeadsAPI from '../services/api/Leads.js';

export default {
	name: 'leadlist',
	data() {
		return {
			leads: [],
			progress: 0,
			query:"",
			searchlist:[]
		}				
	 },
	 methods:{

	 	searchLead(){
	 			
	 		this.leads = [];
	 		for(var i=0;i<(this.completelist).length;i++)
	 		{
	 			if((this.completelist[i].LeadName.toLowerCase().indexOf(this.query.toLowerCase()) > -1) || 
	 					(this.completelist[i].ProjectID.toString().indexOf(this.query.toString	()) > -1) 
	 				)
	 			{
	 				this.leads.push(this.completelist[i])
	 			}
	 		}
	 	},

	 	goToaddlead() {
   			this.$router.push('/addlead')
  		},
	 	goToFollowup(project){
			localStorage.setItem("project", JSON.stringify(project));
			this.$router.push('/followups');
		},
		toggleMenu()  {
			this.$parent.$parent.$parent.$parent.openSide = ((this.$parent.$parent.$parent.$parent.openSide) ? false : true);
		}
	 },
	 mounted:function() {	
	 	var payload = {
	 		Token:localStorage.ki
		 }
		 this.intervalID = setInterval(() => {
			if (this.progress === 100) {
			clearInterval(this.intervalID);
			return;
			}
			this.progress++;
		}, 40);
 	  	GetLeadsAPI.getLeads(payload).then(leads => {
			this.progress = 0;
			clearInterval(this.intervalID);   
 	  		this.leads = leads.Body;
  	  		this.completelist = leads.Body;

 	  	})
 	  }
 	 }				
	
</script> 
<style scoped>

.toolbar {
	background: transparent;
}

.list {
	border-radius: 10px;
	width: 90%;
    margin: 20px;
}

.searchlead{
	width:94%;
	margin-left:10px;
}



</style>