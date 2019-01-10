
<template>
	<v-ons-page id="leaddetailpage">
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button @click="toggleMenu()">
	        		<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="center">{{LeadName}}</div>	
 		</v-ons-toolbar>
		<v-ons-progress-bar :value="progress"></v-ons-progress-bar>
 		<v-ons-card>
 			<div class="content">	
				<v-ons-row>
					<v-ons-col width="68%" class="contact">{{ContactPerson}}</v-ons-col>
					<v-ons-col width="50px">
						<a :href="'tel:' + Mobile">
							<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
						</a>
					</v-ons-col>
					<v-ons-col width="50px">
						<a :href="'mailto:' + Email">
							<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
						</a>
					</v-ons-col>
			 	</v-ons-row>
			 	<v-ons-row>
				  <v-ons-col class="stage" id="ld-status">{{Stage}}</v-ons-col>
			    </v-ons-row>
	 		</div> 						
 		</v-ons-card>

 		<h4 class="heading">Follow UPS</h4>
 		<v-ons-card >
			<v-ons-list modifier="noborder">
				<v-ons-list-item modifier="nodivider" v-for="(value, key) in followups" v-bind:key="key">
				
					<div class="followupdetails" style="width: 100%">	
						<v-ons-row>
							<v-ons-col width="70%" class="task-text">{{value.Task}}</v-ons-col>
							<v-ons-col class="status-text">{{value.Status}}</v-ons-col>	
						</v-ons-row>
						<v-ons-row>
							<v-ons-col class="desc-text">{{value.Description}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>
							<v-ons-col class="date-text">{{value.FollowupDate}}</v-ons-col>
						</v-ons-row>
					</div> 
					<div id="callaction" :class="(current_status=='callaction') ? 'active' : ''">
						
						<v-ons-button modifier="outline" class="gbtnclass" style="margin: 4px 4px" @click="changeMode(key, 'completedtask')">Mark Completed</v-ons-button>
						<v-ons-button modifier="outline" class="btnclass" style="margin: 4px 4px" @click="changeMode(key, 'updatefollowup')">Update</v-ons-button>
						<v-ons-button modifier="outline" class="btnclass" style="margin: 4px 4px" @click="changeMode(key, 'reassign')">Reassign</v-ons-button>

					</div>	

					<div :id="'completedtask' + key" class="subtask">
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

					<div :id="'updatefollowup' + key" class="subtask" >
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

					<div  :id="'reassign' + key" class="subtask" >
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

			</v-ons-list-item>
	</v-ons-list>
 </v-ons-card>
 		
 <div class="no-tasks" v-show="followups.length == 0 && isLoading == false">
			No followups! 
 </div>
       <v-ons-fab position="bottom right" ripple id="add-fab" @click="goTodetail()">
     	   <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
       </v-ons-fab>
	</v-ons-page>
</template>


<script>

import FollowupsAPI from '../services/api/Leads.js';

	export default {
		name: "Followups",
		data() {
			return {

			"LeadName": "",
        	 "Stage": "",
        	 "ContactPerson": "",
        	 "Mobile":"",
        	 "Email":"",
        	 isLoading: true,
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
        	 projectID:"",
        	 progress: 0
			}
		},

		methods: {
			goToHome() {
        		this.$router.push('/container')
      		},
			changeMode(index, mode) {
				console.log(mode, index,document.getElementById(mode+index) )
				if(mode == 'callaction') {
					document.getElementById('completedtask'+index).classList.remove("active");
					document.getElementById('updatefollowup'+index).classList.remove("active");
					document.getElementById('reassign'+index).classList.remove("active");
				} else {
					document.getElementById(mode+index).classList.add("active");
				}
				
				this.current_status = mode;
			},
			goTodetail() {
   			this.$router.push({
   				'name': 'addfollowup',
    			'params': {
        			'items': this.prop
    				}
   				});
  			}
		},

		mounted:function() {

 		var payload = {
	 	
	 		Token:localStorage.ki,
	 		projectId: localStorage.pid

	 	}
	 	this.intervalID = setInterval(() => {
			if (this.progress === 100) {
			clearInterval(this.intervalID);
			return;
			}
			this.progress++;
		}, 40);
 	  	FollowupsAPI.getFollowups(payload).then(projects => {
 	  		this.progress = 0;
 	  		clearInterval(this.intervalID);  
 	  		this.isLoading = false;
 	  		this.LeadName = projects.Body.LeadName;
 	  		this.ContactPerson = projects.Body.ContactPerson;
 	  		this.Stage = projects.Body.Stage;
 	  		this.Mobile = projects.Body.Mobile;
 	  		this.Email = projects.Body.Email;
 	  		this.followups = projects.Body.Followups;
 	  		this.prop = projects.Body;
 	  		console.log(projects);

 	  	})
	  }
	}	

</script> 

<style scoped>
.list {
	margin: 0 !important;
}
.page__content h1 {
    font-size: 22px;
}
.task-text {
	font-size: 18px;
	font-weight: 600;
}
.desc-text {
	font-size: 14px;
	font-weight: 600;
	color: #666;
}
.date-text {
	font-size: 12px;
	color: #999;
}
.status-text {
	text-align: right;
	color: #FF6D15;
}
.contact{
	font-size: 18px;
	font-weight: bold;
}
.status{
	color: green;
	font-weight: bold;
}
.subtask{
	display: none;
}
.active {
	display: block;
}
 #callaction {
	 margin-bottom: 20px;
 }
.card.active #callaction{
	display: none;
}

.btnclass{
	font-size: 14px;
	border-color: #999;
	color: #999;
}
.gbtnclass{
	font-size: 14px;
	border-color: #14BA88;
	color: #14BA88;
}
.heading {
	color: #fff;
	font-size: 1em;
	font-weight: bold;
	margin-left: 20px !important;
	margin-top: 40px !important;
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