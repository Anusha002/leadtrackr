
<template>
	<v-ons-page id="leaddetailpage">
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button @click="toggleMenu()">
	        		<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="center">{{items.LeadName}}</div>	
 		</v-ons-toolbar>
		<v-ons-progress-bar :value="progress"></v-ons-progress-bar>
 		<v-ons-card>
 			<div class="content">	
				<v-ons-row>
					<v-ons-col width="75%" class="contact">{{items.ContactName}}</v-ons-col>
					<v-ons-col width="35px">
						<a :href="'tel:' + items.Mobile">
							<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
						</a>
					</v-ons-col>
					<v-ons-col width="30px">
						<a :href="'mailto:' + items.Email">
							<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
						</a>
					</v-ons-col>
			 	</v-ons-row>
			 	<v-ons-row>
				  <v-ons-col class="stage" id="ld-status">{{items.Stage}}</v-ons-col>
			    </v-ons-row>
	 		</div> 						
 		</v-ons-card>

 		<h4 class="heading">Follow-ups</h4>
 		<v-ons-card >
			<v-ons-list modifier="noborder">
				<v-ons-list-item v-for="(value, key) in followups" v-bind:key="key">
				
					<div class="followupdetails" style="width: 100%">	
						<v-ons-row>
							<v-ons-col width="70%" class="task-text">{{value.Task}}</v-ons-col>
							<v-ons-col class="status-text">{{value.Status}}</v-ons-col>	
						</v-ons-row>
						<v-ons-row>
							<v-ons-col class="desc-text">{{value.Description}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>
							<v-ons-col class="date-text">{{readableDate(new Date(value.FollowupDate))}}</v-ons-col>
						</v-ons-row>
					</div> 
					<div id="callaction" :class="(current_status=='callaction') ? 'active' : ''">
						
						<v-ons-button modifier="outline" class="gbtnclass outline-btn" style="margin: 4px 4px" @click="completeVisible = true; StageHistoryID = value.StageHistoryID;">Mark Completed</v-ons-button>
					<!-- 	<v-ons-button modifier="outline" class="gbtnclass" style="margin: 4px 4px" @click="changeMode(key, 'completedtask')">Mark Completed</v-ons-button> -->
						<v-ons-button modifier="outline" class="btnclass outline-btn" style="margin: 4px 4px" @click="updateVisible = true">Update</v-ons-button>
						<v-ons-button modifier="outline" class="btnclass outline-btn" style="margin: 4px 4px" @click="reassignVisible = true">Reassign</v-ons-button>

					</div>	

			</v-ons-list-item>
	</v-ons-list>
 </v-ons-card>
 		
 <div class="no-tasks" v-show="followups.length == 0 && isLoading == false">
			No followups! 
 </div>
        <v-ons-dialog cancelable :visible.sync="completeVisible">	
			<v-ons-row class="rowdata">
				<v-ons-col>
					<b>Mark Completed</b>
				</v-ons-col>
			</v-ons-row>		
			<v-ons-row class="rowdata">
				 <div class="labels">Completion Remarks</div>
				<v-ons-col> 
					<v-ons-input type="text" modifier="underbar" class="remarks" name="remarks" v-model="completefollowup.CompletionRemark" v-validate="required" ></v-ons-input>
					<p class="text-danger" >{{ errors.first('remarks')}}</p> 
				</v-ons-col>
			</v-ons-row>
			<v-ons-row class="rowdata">
				<div class="labels">Time Taken</div>
				<v-ons-col> 
					<v-ons-input type="number" modifier="underbar" class="hourtime" name="hourtaken" placeholder="hours" v-model="completefollowup.Hr" v-validate="required" ></v-ons-input>
					<p class="text-danger" >{{ errors.first('hourtaken')}}</p> 
				</v-ons-col>
				<v-ons-col> 
					<v-ons-input type="number" modifier="underbar" class="minutetime" name="minutetaken" placeholder="minutes" v-model="completefollowup.Min" v-validate="required" ></v-ons-input>
					<p class="text-danger" >{{ errors.first('minutetaken')}}</p> 
				</v-ons-col>
			</v-ons-row>
			<v-ons-row class="rowdata">
				<div class="labels">Distance Travelled</div>
				<v-ons-col> 
					<v-ons-input type="number" modifier="underbar" class="traveldistance" name="traveldistance" v-model="completefollowup.Distance"></v-ons-input>
				</v-ons-col>
			</v-ons-row>
			<v-ons-row class="rowdata">
				<v-ons-col>
					<v-ons-button modifier="outline"  class="gbtnclass" style="margin: 6px 4px" @click="completeVisible = false">Cancel</v-ons-button>
				
					<v-ons-button class="green-button"  style="margin: 6px 4px"@click="completeFollowup()">Save</v-ons-button>
				</v-ons-col>
			</v-ons-row>
		</v-ons-dialog>

		<v-ons-dialog cancelable :visible.sync="updateVisible">
			<v-ons-row class="rowdata">
							<v-ons-col>
								<b>Update Follow up</b>
							</v-ons-col>
						</v-ons-row>		
						<v-ons-row class="rowdata">
							<div class="labels">Substatus</div>
							<v-ons-col> 
								<!-- <v-ons-input type="text" modifier="underbar" class="updatestatus" name="updatestatus" placeholder="Update Sub status" v-model="input.updatestatus" v-validate="required" ></v-ons-input>
								<p class="text-danger" >{{ errors.first('updatestatus')}}</p>  -->
								<v-ons-select style="width: 100%" v-model="updatefollowup.Substatus" name="substatus" v-validate="'required'">
                                   <option value="" selected data-default></option>
                                 <option v-for="(value,key) in substatus" :value="value" v-bind:key="key">
                                   {{ value}}
                                </option>
                                </v-ons-select>
							</v-ons-col>
						</v-ons-row>
						<v-ons-row class="rowdata">
							<div class="labels">Time Taken</div>
							<v-ons-col> 
								<v-ons-input type="number" modifier="underbar" class="hourtime" name="hourtaken" placeholder="hours" v-model="completefollowup.Hr" v-validate="required" ></v-ons-input>
								<p class="text-danger" >{{ errors.first('hourtaken')}}</p> 
							</v-ons-col>
							<v-ons-col> 
								<v-ons-input type="number" modifier="underbar" class="minutetime" name="minutetaken" placeholder="minutes" v-model="completefollowup.Min" v-validate="required" ></v-ons-input>
								<p class="text-danger" >{{ errors.first('minutetaken')}}</p> 
							</v-ons-col>
						</v-ons-row>
						
						<v-ons-row class="rowdata">
							 <div class="labels">Update Remarks</div>
							<v-ons-col> 
								<v-ons-input type="text" modifier="underbar" class="remarks" name="remarks" v-model="completefollowup.CompletionRemark" v-validate="required" ></v-ons-input>
								<p class="text-danger" >{{ errors.first('remarks')}}</p> 
							</v-ons-col>
						</v-ons-row>
						<v-ons-row class="rowdata">
							<div class="labels">Distance Travelled</div>
							<v-ons-col> 
								<v-ons-input type="number" modifier="underbar" class="traveldistance" name="traveldistance" v-model="completefollowup.Distance"></v-ons-input>
							</v-ons-col>
						</v-ons-row>
						<v-ons-row class="rowdata">
							<v-ons-col>
								<v-ons-button modifier="outline"  class="gbtnclass"   style="margin: 6px 4px" @click="updateVisible = false">Cancel</v-ons-button>
							
								<v-ons-button class="green-button"  style="margin: 6px 4px">Save</v-ons-button>
							</v-ons-col>
						</v-ons-row>
					
		</v-ons-dialog>
		<v-ons-dialog cancelable :visible.sync="reassignVisible">
			<v-ons-row class="rowdata">
							<v-ons-col>
								<b>Reassign</b>
							</v-ons-col>
						</v-ons-row>		
						<!-- <v-ons-row class="rowdata">
							<v-ons-col> 
								<v-ons-input type="text" modifier="underbar" class="user" name="user" placeholder="User" v-model="input.user" v-validate="required" ></v-ons-input>
								<p class="text-danger" >{{ errors.first('user')}}</p> 
							</v-ons-col>
						</v-ons-row>
						<v-ons-row class="rowdata">
							<v-ons-col> 
								<v-ons-input type="number" modifier="underbar" class="reassigntime" name="reassigntime" placeholder="Time Taken" v-model="input.reassigntime"  ></v-ons-input>
							</v-ons-col>
						
							<v-ons-col> 
								<v-ons-input type="number" modifier="underbar" class="reassigndistance" name="reassigndistance" placeholder="Distance Travelled" v-model="input.reassigndistance" ></v-ons-input>
							</v-ons-col>
						</v-ons-row>
						<v-ons-row class="rowdata">
							<v-ons-col> 
								<v-ons-input type="text" modifier="underbar" class="reassignremarks" name="reassignremarks" placeholder="Remarks" v-model="input.reassignremarks" ></v-ons-input>
							</v-ons-col>
						</v-ons-row> -->
						<v-ons-row class="rowdata">
							<v-ons-col>
								<v-ons-button modifier="outline"  class="gbtnclass" style="margin: 6px 4px" @click="reassignVisible = false">Cancel</v-ons-button>
							
								<v-ons-button class="green-button"  style="margin: 6px 4px">Save</v-ons-button>
							</v-ons-col>
						</v-ons-row>

		</v-ons-dialog>
    
       <v-ons-fab position="bottom right" ripple id="add-fab" @click="goTodetail()">
     	   <v-ons-icon icon="md-plus" ></v-ons-icon> 	 
       </v-ons-fab>
	</v-ons-page>
</template>


<script>

// import FollowupsAPI from '../services/api/Leads.js';
import FollowupsAPI from '../services/api/Followup.js';
import Utils from '../services/api/Utils.js';

	export default {
		name: "Followups",
		data() {
			var prj = JSON.parse(localStorage.project);
			return {

			completeVisible: false,
			updateVisible: false,
			reassignVisible: false,
			StageHistoryID: "",
			items: {
				LeadName: prj.LeadName,
				Mobile: prj.Mobile,
				Email: prj.Email,
				ContactName: prj.ContactName,
				Stage: prj.Stage

			},
			 "pjctid" : prj.ProjectID,
			 "ProjectName":"",
        	 "Stage": "",
        	 "ContactName": "",
        	 isLoading: true,
        	 prop:{},
        	 followups: [],
        	 substatus:[],
        	 completefollowup:{
        	 	CompletionRemark:"",
        	 	Hr:"",
        	 	Min:"",
        	 	Distance:"",
        	 	LeadName:prj.LeadName,
        	 	ContactName:prj.ContactName,
        	 	ContactEmail:prj.ContactEmail,
        	 	ContactMobile:prj.ContactMobile,
        	 	ContactLandline:prj.ContactLandline,
        	 	ScheduleBy:prj.ScheduleBy,
        	 	ScheduleTo:prj.ScheduleTo,
        	 	Task:prj.Task,
        	 	ClaimAmount:"",
        	 	Substatus:"",
        	 	projectId:prj.ProjectID
        	 },
        	 updatefollowup:{
        	 	Substatus:""
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
					this.resetModes(index);
				} else {
					this.resetModes(index);
					document.getElementById(mode+index).classList.add("active");
				}
				
				this.current_status = mode;
			},
			resetModes(index) {
				document.getElementById('completedtask'+index).classList.remove("active");
				document.getElementById('updatefollowup'+index).classList.remove("active");
				document.getElementById('reassign'+index).classList.remove("active");
			},
			goTodetail() {

   			this.$router.push({
   				'name': 'addfollowup',
    			'params': {
        			'items': this.prop
    				}
   				});
  			},
  			readableDate(date) {
  				return Utils.readableDate(date);
  			},
  			completeFollowup(){
  				console.log(this.StageHistoryID)
  				this.completefollowup.Token = localStorage.ki;
  				// this.completefollowup.projectId = Utils.getProjectid();
  				this.completefollowup.StageHistoryID = this.StageHistoryID.toString();
 
			    var data = this.completefollowup;
			     this.$validator.validate().then(valid => {
			     console.log(data);
        			if (valid) {
            		FollowupsAPI.completeFollowup(data).then(followups => {
             		 console.log('followup completed');
           			 this.$router.push('/followups');

           				 }, error => {
               				console.error(error);
            			}); 
          			}
       			 })

  			}
		},

		mounted:function() {
		var date = new Date();

 		var payload = {
	 		Token:localStorage.ki,
	 		projectId: (this.pjctid).toString(),
	 		UserID:Utils.getUserid() 
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
 	  		this.followups = projects.Body;
 	  		this.prop = projects.Body;
 	  		console.log(projects.Body);

 	  	}),
 	  	Utils.getStatus(payload).then(substatus => {
          this.substatus = this.substatus.concat(substatus.Body);
          console.log(substatus.Body);
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
	width: 120px;
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

.hourtime .minutetime{
	width:50%;
}

.ons-icon.fa {
	font-size: 1.4em;
	color: #333;
}

</style>