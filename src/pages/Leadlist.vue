<template>
	<v-ons-page id="leadlistpage">	
		<v-ons-progress-bar :value="progress"></v-ons-progress-bar>
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button>
					<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>  
				</v-ons-toolbar-button>
    		</div>
    		<div class="center">
    			Leads List
	        </div>	
	       
 		</v-ons-toolbar>
    		<v-ons-search-input class="searchlead" placeholder="Search for lead/LeadID" :disabled="progress > 0" v-model="query" v-on:keyup="searchLead()">		
    		</v-ons-search-input>
		<div class="leadlist">
			
			<card v-for="(value, key) in leads" :cardData="value" mode="Stage" v-bind:key="key"></card>
			
		</div>
		<div class="no-tasks" v-show="leads.length == 0 && progress == 0">
			No Leads Found! 
		</div>
		<v-ons-fab position="bottom right" ripple id="add-fab" @click="goToaddlead()">
     		 <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
    	</v-ons-fab>
	</v-ons-page>
</template>

<script>

import GetLeadsAPI from '../services/api/Leads.js';
import card from '../components/Card.vue';

export default {
	name: 'leadlist',
	components: {
		card
	},
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
	 		for(var i=0;i<(this.searchresults).length;i++)
	 		{
	 			if((this.searchresults[i].LeadName.toLowerCase().indexOf(this.query.toLowerCase()) > -1) || 
	 					(this.searchresults[i].ProjectID.toString().indexOf(this.query.toString	()) > -1) 
	 				)
	 			{
	 				this.leads.push(this.searchresults[i])
	 			}
	 		}
		 },
		 goToHome(){
			this.$router.back(-1);
		 },

	 	goToaddlead() {
   			this.$router.push({
   				'name' :'addlead',
   				'params' : {
   					'mode' : 'leadlist'
   				}
   			})
  		},
	 	goToFollowup(project){
			localStorage.setItem("project", JSON.stringify(project));
			this.$router.push({
				'name': 'followups',
				'params':{
   					'mode': 'leadlist'
   				}
		})
			
		},
		toggleMenu()  {
			this.$parent.$parent.$parent.$parent.openSide = ((this.$parent.$parent.$parent.$parent.openSide) ? false : true);
		},
		editLead(lead){	
			this.$router.push({
				'name': 'addlead',
				'params':{
   					'editlead': lead
   				}
		})
		}	
	 },
	 mounted:function() {	
		 try{
			window.FirebasePlugin.setScreenName("Leadlist");
		} catch(e){}
	 	var payload = {
	 		Token:localStorage.ki
		 }
		 
		if (typeof localStorage.projectlist != 'undefined'){
			this.leads = JSON.parse(localStorage.projectlist);
			this.searchresults = this.leads;
		} else {
			this.intervalID = setInterval(() => {
			if (this.progress === 100) {
				clearInterval(this.intervalID);
				return;
			}
			this.progress++;
		}, 40);
		}
 	  	GetLeadsAPI.getLeads(payload).then(leads => {
 	  		if(typeof leads.response != 'undefined') {
				this.progress = 0;
	            this.$ons.notification.alert(leads.response.statusText);
	        } else {
				this.progress = 0;
				clearInterval(this.intervalID); 
				if(typeof leads.Body != 'undefined') {
					localStorage.setItem("projectlist", JSON.stringify(leads.Body));
				}
				this.leads = leads.Body;
				this.searchresults = leads.Body;
  	  		}
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
	position:fixed;
}
.leadlist{
	margin-top:55px;
}


</style>