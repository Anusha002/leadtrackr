
<template id="actions">

</template>
<template id="leaddetail">
	<v-ons-page id="leaddetailpage">
		<h1 class="heading">{{LeadName}}</h1>
 		<v-ons-card>
 			<div class="content">	
				<span><b>{{OwnerName}}</b></span>
				<p class="status" >{{Status}}</p>
	 		</div> 						
 		</v-ons-card>

 		<h1 class="heading">Follow UPS</h1>
 		<v-ons-list>
 		<v-ons-list-item v-for="(value, key) in followups">
 		<v-ons-card :id="'card' + key">
 			<div class="followupdetails" >	
				<span><b>{{value.ScheduleTo}}<br>{{value.Stage}}</b></span>	
				<span><br>{{value.FollowupDate}}</b></span>	
				<span><br>{{value.Description}}</b></span>		
	 		</div> 
	 		<div id="callaction" :class="(current_status=='callaction') ? 'active' : ''">
	 			<v-ons-list-item>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px" @click="changeMode(key, 'completedtask')">Mark Completed</v-ons-button>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px"@click="changeMode(key, 'updatefollowup')">Update</v-ons-button>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px" @click="changeMode(key, 'reassign')">Reassign</v-ons-button>
	    	</v-ons-list-item>
	 		</div>	

	 		<div id="completedtask" class="subtask" :class=" (current_status=='completedtask') ? 'active' : ''">
	 			<v-ons-row class="rowdata">
	 				<v-ons-col>
	 					<b>Mark Completed</b>
	 				</v-ons-col>
	 			</v-ons-row>		
	 			<v-ons-row class="rowdata">
	    			<v-ons-col> 
	    				<v-ons-input type="text" modifier="underbar" class="remarks" name="remarks" placeholder="Completion Remarks" v-model="input.remarks" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		</v-ons-row>
	    		<v-ons-row class="rowdata">
	    			<v-ons-col> 
	    				<v-ons-input type="number" modifier="underbar" class="timetaken" name="timetaken" placeholder="Time Taken" v-model="input.timetaken" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		
	    			<v-ons-col> 
	    				<v-ons-input type="number" modifier="underbar" class="traveldistance" name="traveldistance" placeholder="Distance Travelled" v-model="input.traveldistance" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		</v-ons-row>
	    		<v-ons-row class="rowdata">
	    			<v-ons-col>
	    				<v-ons-button  style="margin: 6px 4px" @click="changeMode(key,'callaction')">Cancel</v-ons-button>
	    			
	    				<v-ons-button  style="margin: 6px 4px">Save</v-ons-button>
	    			</v-ons-col>
	    		</v-ons-row>
	    	
	 		</div>

	 		<div id="updatefollowup" class="subtask" :class=" (current_status=='updatefollowup') ? 'active' : ''">
	 			<v-ons-row class="rowdata">
	 				<v-ons-col>
	 					<b>Update Follow up</b>
	 				</v-ons-col>
	 			</v-ons-row>		
	 			<v-ons-row class="rowdata">
	    			<v-ons-col> 
	    				<v-ons-input type="text" modifier="underbar" class="updatestatus" name="updatestatus" placeholder="Update Sub status" v-model="input.updatestatus" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		</v-ons-row>
	    		<v-ons-row class="rowdata">
	    			<v-ons-col> 
	    				<v-ons-input type="number" modifier="underbar" class="updatetime" name="updatetime" placeholder="Time Taken" v-model="input.updatetime" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		
	    			<v-ons-col> 
	    				<v-ons-input type="number" modifier="underbar" class="updatedistance" name="updatedistance" placeholder="Distance Travelled" v-model="input.updatedistance" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		</v-ons-row>
	    		<v-ons-row class="rowdata">
	    			<v-ons-col> 
	    				<v-ons-input type="text" modifier="underbar" class="updateremarks" name="updateremarks" placeholder="Remarks" v-model="input.updateremarks" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		</v-ons-row>
	    		<v-ons-row class="rowdata">
	    			<v-ons-col>
	    				<v-ons-button  style="margin: 6px 4px" @click="changeMode(key,'callaction')">Cancel</v-ons-button>
	    			
	    				<v-ons-button  style="margin: 6px 4px">Save</v-ons-button>
	    			</v-ons-col>
	    		</v-ons-row>
	    	
	 		</div>

	 		<div id="reassign" class="subtask" :class=" (current_status=='reassign') ? 'active' : ''" >
	 			<v-ons-row class="rowdata">
	 				<v-ons-col>
	 					<b>Reassign</b>
	 				</v-ons-col>
	 			</v-ons-row>		
	 			<v-ons-row class="rowdata">
	    			<v-ons-col> 
	    				<v-ons-input type="text" modifier="underbar" class="user" name="user" placeholder="User" v-model="input.user" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		</v-ons-row>
	    		<v-ons-row class="rowdata">
	    			<v-ons-col> 
	    				<v-ons-input type="number" modifier="underbar" class="reassigntime" name="reassigntime" placeholder="Time Taken" v-model="input.reassigntime" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		
	    			<v-ons-col> 
	    				<v-ons-input type="number" modifier="underbar" class="reassigndistance" name="reassigndistance" placeholder="Distance Travelled" v-model="input.reassigndistance" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		</v-ons-row>
	    		<v-ons-row class="rowdata">
	    			<v-ons-col> 
	    				<v-ons-input type="text" modifier="underbar" class="reassignremarks" name="reassignremarks" placeholder="Remarks" v-model="input.reassignremarks" v-validate="required" ></v-ons-input>
	    			</v-ons-col>
	    		</v-ons-row>
	    		<v-ons-row class="rowdata">
	    			<v-ons-col>
	    				<v-ons-button  style="margin: 6px 4px" @click="changeMode(key, 'callaction')">Cancel</v-ons-button>
	    			
	    				<v-ons-button  style="margin: 6px 4px">Save</v-ons-button>
	    			</v-ons-col>
	    		</v-ons-row>
	    	
	 		</div>

 		</v-ons-card>
 	</v-ons-list-item>
 </v-ons-list>
 		
  <v-ons-fab position="bottom right" ripple id="add-fab" @click="goTodetail()">
      <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
   </v-ons-fab>
	</v-ons-page>
</template>


<script>

import FollowupsAPI from '../services/api/Leads.js';

	export default {
		name: "Leaddetail",
		data() {
			return {
			"LeadName": "",
        	 "Status": "",
        	 "OwnerName": "",
        	 prop:{},
        	 followups: [],
        	 input: {
        	 	remarks: "",
        	 	timetaken: "",
        	 	traveldistance: "",
        	 	updatestatus: "",
        	 	updatetime: "",
        	 	updatedistance: "",
        	 	updateremarks: ""
        	 },
        	 current_status : "callaction",
        	 projectID:""
			}
		},

		methods: {
			goTodetail() {
   			this.$router.push({
   				'name': 'addfollowup',
   				'params':{
   					'items': this.prop
   				}
   				});
  			},
			changeMode(index, mode) {
				console.log('>>>>>>>>>>>>>>>>>>', index)
				if(mode == 'callaction') {
					document.getElementById('card'+index).classList.remove("active");
				} else {
					document.getElementById('card'+index).classList.add("active");
				}
				
				this.current_status = mode;
			}
		},

		mounted:function() {

 		var payload = {
	 	
	 		Token:localStorage.ki
	 	}
	 	
 	  	FollowupsAPI.getFollowups(payload).then(projects => {
 	  		console.log(projects);
 	  		this.LeadName = projects.Body.LeadName;
 	  		this.OwnerName = projects.Body.OwnerName;
 	  		this.Status = projects.Body.Status;
 	  		this.followups = projects.Body.Followups;
 	  		this.prop = projects.Body;

 	  	})
	  }
	}	

</script> 

<style>

.page__content h1 {
    font-size: 22px;
}
.status{
	color: green;
	font-weight: bold;
}
.subtask{
	display: none;
}
.card.active .active {
	display: block;
}
.card.active #callaction{
	display: none;
}

.btnclass{
	font-size: 14px;
	color: "black";
	background-color: grey;

}

.rowdata{
	padding-top:15px;
	font-size:16px;
}

.list{
	background-color: transparent;
}
.button{
	padding:6px;
}

.ons-icon.fa {
	font-size: 1.4em;
	color: #333;
}
</style>