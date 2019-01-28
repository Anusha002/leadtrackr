
<template>
	<v-ons-page id="leaddetailpage">
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button>
	        		<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="center">{{items.LeadName}}</div>	
    		<div class="right">
    			<v-ons-toolbar-button @click="editLead()">
	        		<v-ons-icon modifier="large" class="icon-edit header-icon"></v-ons-icon>
	        	</v-ons-toolbar-button>	
	        </div>	
 		</v-ons-toolbar>
		<v-ons-progress-bar :value="progress"></v-ons-progress-bar>
 		<v-ons-card>
 			<div class="content">	
				<v-ons-row>
					<v-ons-col width="78%" class="contact">{{items.ContactName}}</v-ons-col>
					<v-ons-col width="35px">
						<a v-if="items.Mobile" :href="'tel:' + items.Mobile">
							<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
						</a>
					</v-ons-col>
					<v-ons-col width="30px">
						<a v-if="items.Email" :href="'mailto:' + items.Email">
							<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
						</a>
					</v-ons-col>
			 	</v-ons-row>
			 	<v-ons-row>
				  <v-ons-col class="stage" id="ld-status">{{items.Stage}}</v-ons-col>
				  <a v-if="items.Latitude" :href="'https://www.google.com/maps/search/?api=1&query=' + items.Latitude + ',' + items.Longitude" target="_blank" style="margin-right: 10px; margin-top: 10px;">
				  	<v-ons-icon modifier="large" class="icon-send"></v-ons-icon>
				  </a>
			    </v-ons-row>
	 		</div> 						
 		</v-ons-card>

 		<h4 class="heading">Follow-ups</h4>
 		<v-ons-card  v-show="followups.length > 0">
			<v-ons-list modifier="noborder">
				<v-ons-list-item v-for="(value, key) in followups" v-bind:key="key">
				
					<div class="followupdetails" style="width: 100%">	
						<v-ons-row>
							<v-ons-col width="70%" class="task-text">{{value.Task}}</v-ons-col>
							<v-ons-col class="status-text">{{value.Substatus}}</v-ons-col>	
						</v-ons-row>
						<v-ons-row>
							<v-ons-col class="desc-text">{{value.Description}}</v-ons-col>
						</v-ons-row>
						<v-ons-row>
							<v-ons-col class="date-text">{{readableDate(new Date(value.FollowupDate))}}</v-ons-col>
						</v-ons-row>
					</div> 
					<div id="callaction" :class="(current_status=='callaction') ? 'active' : ''">
						
						<v-ons-button modifier="outline" class="gbtnclass outline-btn" style="margin: 4px 4px" @click="resetDialogs(); completeVisible = true;  StageHistoryID = value.StageHistoryID; FollowupDate = readableDate(new Date(value.FollowupDate)); Description = value.Description;">Mark Completed</v-ons-button>
						<v-ons-button modifier="outline" class="btnclass outline-btn" style="margin: 4px 4px" @click="resetDialogs(); updateVisible = true; StageHistoryID = value.StageHistoryID; FollowupDate = readableDate(new Date(value.FollowupDate)); Description = value.Description;">Update</v-ons-button>
						<v-ons-button modifier="outline" class="btnclass outline-btn" style="margin: 4px 4px" @click="resetDialogs(); reassignVisible = true;StageHistoryID = value.StageHistoryID; FollowupDate = readableDate(new Date(value.FollowupDate)); Description = value.Description;">Reassign</v-ons-button>

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


       <v-ons-dialog cancelable v-if="completeVisible"  :visible.sync="completeVisible">	
		<v-ons-row class="rowdata">
			<v-ons-col>
				<b>Mark Completed</b>
			</v-ons-col>
		</v-ons-row>	
		 
		<v-ons-row class="rowdata">
				<div class="labels">Completion Remarks</div>
				<v-ons-input type="text" modifier="underbar" class="remarks" name="remarks" v-model="CompletionRemark" v-validate="'required'"></v-ons-input>
				<p class="text-danger" >{{ errors.first('remarks')}}</p> 
		</v-ons-row>
			
		<v-ons-row class="rowdata">
			<div class="labels">Time Taken</div><br>
		</v-ons-row>
		<v-ons-row>	
			<v-ons-col width="48%" style="margin-right: 10px"> 
				<v-ons-input type="number" modifier="underbar" class="hourtime" name="hours" placeholder="hours" v-model="input.Hr" v-validate="'required'"></v-ons-input>
				<p class="text-danger" >{{ errors.first('hours')}}</p> 
			</v-ons-col>
			<v-ons-col > 
				<v-ons-input type="number" modifier="underbar" class="minutetime" name="minutes" placeholder="minutes" v-model="input.Min" v-validate="'required|max_value:59'" ></v-ons-input>
				<p class="text-danger" >{{ errors.first('minutes')}}</p> 
			</v-ons-col>
		</v-ons-row>
		<v-ons-row class="rowdata">
				<div class="labels">Distance Travelled</div>
				<v-ons-input type="number" modifier="underbar" class="traveldistance" name="distance" v-model="input.Distance" v-validate="'required'"></v-ons-input>
				<p class="text-danger" >{{ errors.first('distance')}}</p> 
		</v-ons-row>
		<v-ons-row class="rowdata">
				<div class="labels">Claim Amount</div>
				<v-ons-input type="number" modifier="underbar" class="claimamount" name="amount" v-model="input.ClaimAmount" v-validate="'required'"></v-ons-input>
				<p class="text-danger" >{{ errors.first('amount')}}</p> 
		</v-ons-row>
		<v-ons-row class="rowdata">
				<v-ons-button modifier="outline"  class="gbtnclass" style="margin: 6px 4px" @click="completeVisible = false">Cancel</v-ons-button>	
				<v-ons-button class="green-button"  style="margin: 6px 4px"@click="editFollowup()">Save</v-ons-button>
		</v-ons-row>
	</v-ons-dialog>




	<v-ons-dialog cancelable v-if="updateVisible"  :visible.sync="updateVisible">
		<v-ons-row class="rowdata">
			<p><b>Update Follow up</b></p>
		</v-ons-row>		
		<v-ons-row>	
			<div class="labels">Substatus</div>
			<v-ons-select style="width: 100%" v-model="input.Substatus" name="substatus" v-validate="'required'">
				<option value="" selected data-default></option>
				<option v-for="(value,key) in substatus" :value="value" v-bind:key="key">
					{{ value}}
				</option>
			</v-ons-select>
		</v-ons-row>
		<v-ons-row class="rowdata">
			<div @click="openCalender('')" class="small-text">Change Followup Date</div>
			<div @click="openCalender('')"  class="fllwdate">{{dateformat(FllwDate)}}</div><br/>
            <v-date-picker :popover-visibility="showcalender" :min-date='new Date()' mode='single' v-model="FllwDate" name="followupdate" v-validate="'required'" @dayclick='dayClicked' style="margin-left: -240px;">
             </v-date-picker>
            
             <p class="text-danger">{{ errors.first('followupdate')}}</p>
		</v-ons-row>
		<v-ons-row class="rowdata">
			<div class="labels">Time Taken{{input.Hr}}{{input.Min}}</div>
		</v-ons-row>
		<v-ons-row>	
			<v-ons-col width="48%" style="margin-right: 10px"> 
				<v-ons-input type="number" modifier="underbar" class="hourtime" name="hourtaken" placeholder="hours" v-model="input.Hr" v-validate="'required'" ></v-ons-input>
				<p class="text-danger" >{{ errors.first('hourtaken')}}</p> 
			</v-ons-col>
			<v-ons-col > 
				<v-ons-input type="number" modifier="underbar" class="minutetime" name="minutetaken" placeholder="minutes" v-model="input.Min" v-validate="'required'" ></v-ons-input>
				<p class="text-danger" >{{ errors.first('minutetaken')}}</p> 
			</v-ons-col>
		</v-ons-row>
		
		<v-ons-row class="rowdata">
				<div class="labels">Update Remarks</div>
				<v-ons-input type="text" modifier="underbar" class="remarks" name="remarks" v-model="updatefollowup.remarks" v-validate="'required'" ></v-ons-input>
				<p class="text-danger" >{{ errors.first('remarks')}}</p> 
		</v-ons-row>
		<v-ons-row class="rowdata">
				<div class="labels">Distance Travelled</div>
				<v-ons-input type="number" modifier="underbar" class="traveldistance" name="traveldistance" v-model="input.Distance"></v-ons-input>
			
		</v-ons-row>
		<v-ons-row class="rowdata">
				<div class="labels">Claim Amount</div>
				<v-ons-input type="number" modifier="underbar" class="claimamount" name="amount" v-model="input.ClaimAmount" v-validate="'required'"></v-ons-input>
				<p class="text-danger" >{{ errors.first('amount')}}</p> 
		</v-ons-row>
		<v-ons-row class="rowdata">
				<v-ons-button modifier="outline"  class="gbtnclass"   style="margin: 6px 4px" @click="updateVisible = false">Cancel</v-ons-button>

				<v-ons-button class="green-button"  style="margin: 6px 4px" @click="editFollowup()">Save</v-ons-button>
		</v-ons-row>
					
	</v-ons-dialog>




	
		
		<v-ons-dialog cancelable v-if="reassignVisible"  :visible.sync="reassignVisible">
			<v-ons-row class="rowdata">
					<b>Reassign</b>
			</v-ons-row>	
				
			<v-ons-row class="rowdata">
				<div class="labels">Reassign To</div>
					<v-ons-select style="width: 100%" v-model="reassign.ScheduleTo" name="scheduleto">
		                <option value="" selected data-default></option>
		                <option v-for="(value,key) in scheduleTo" :value="value.FullName" v-bind:key="key">
		                   {{ value.FullName }}
		                </option>
            	</v-ons-select>
			</v-ons-row>
				
			<v-ons-row class="rowdata">
					<div class="labels">Reassign Remarks</div>
					<v-ons-input type="text" modifier="underbar" class="remarks" name="remarks" v-model="reassign.remarks" v-validate="'required'" ></v-ons-input>
					<p class="text-danger" >{{ errors.first('remarks')}}</p> 
			</v-ons-row>
			<v-ons-row class="rowdata">
			<div @click="openCalender('')" class="small-text">Change Followup Date</div>
			<div @click="openCalender('')"  class="fllwdate">{{dateformat(FllwDate)}}</div><br/>
            <v-date-picker :popover-visibility="showcalender" :min-date='new Date()' mode='single' v-model="FllwDate" name="followupdate" v-validate="'required'" @dayclick='dayClicked' style="margin-left: -240px;">
             </v-date-picker>
            
             <p class="text-danger">{{ errors.first('followupdate')}}</p>
		</v-ons-row>
			<v-ons-row class="rowdata">
				<div class="labels">Time Taken</div><br>
			</v-ons-row>
			<v-ons-row>	
				<v-ons-col width="48%" style="margin-right: 10px"> 
					<v-ons-input type="number" modifier="underbar" class="hourtime" name="hourtaken" placeholder="hours" v-model="input.Hr" v-validate="'required'" ></v-ons-input>
					<p class="text-danger" >{{ errors.first('hourtaken')}}</p> 
				</v-ons-col>
				<v-ons-col > 
					<v-ons-input type="number" modifier="underbar" class="minutetime" name="minutetaken" placeholder="minutes" v-model="input.Min" v-validate="'required'" ></v-ons-input>
					<p class="text-danger" >{{ errors.first('minutetaken')}}</p> 
				</v-ons-col>
			</v-ons-row>
			<v-ons-row class="rowdata">
					<div class="labels">Distance Travelled</div>
					<v-ons-input type="number" modifier="underbar" class="traveldistance" name="traveldistance" v-model="input.Distance"></v-ons-input>
			</v-ons-row>
			<v-ons-row class="rowdata">
					<div class="labels">Claim Amount</div>
					<v-ons-input type="number" modifier="underbar" class="claimamount" name="amount" v-model="input.ClaimAmount" v-validate="'required'"></v-ons-input>
					<p class="text-danger" >{{ errors.first('amount')}}</p> 
			</v-ons-row>
			<v-ons-row class="rowdata">
					<v-ons-button modifier="outline"  class="gbtnclass" style="margin: 6px 4px" @click="reassignVisible = false">Cancel</v-ons-button>
					<v-ons-button class="green-button"  style="margin: 6px 4px" @click="editFollowup()">Save</v-ons-button>
			</v-ons-row>

		</v-ons-dialog>


	</v-ons-page>
</template>


<script>

import FollowupsAPI from '../services/api/Followup.js';
import Utils from '../services/api/Utils.js';


	export default {
		name: "Followups",
		props: ['mode'],
		data() {
			var prj = JSON.parse(localStorage.project);
			return {

			completeVisible: false,
			updateVisible: false,
			reassignVisible: false,
			StageHistoryID: "",
			FollowupDate:"",
			Status:"",
			scheduleTo:[],
			items: {
				LeadName: prj.LeadName,
				Mobile: prj.Mobile,
				Email: prj.Email,
				ContactName: prj.ContactName,
				Stage: prj.Stage,
				Latitude: prj.Latitude,
				Longitude: prj.Longitude
			},
			 "pjctid" : prj.ProjectID,
        	 isLoading: true,
        	 prop:{},
        	 followups: [],
        	 substatus:[],
       	 	CompletionRemark:"",
       	 	Description:"",
       		FllwDate: "",
       		showcalender: 'hidden',
        	 input:{	
        	 	Hr:"",
        	 	Min:"",
        	 	Distance:"",
        	 	ClaimAmount:"",
        	 	Substatus:"",
        	 	LeadName:prj.LeadName,
        	 	ContactName:prj.ContactName,
        	 	ContactEmail:prj.ContactEmail,
        	 	ContactMobile:prj.ContactMobile,
        	 	ContactLandline:prj.ContactLandline,
        	 	ScheduleBy:prj.ScheduleBy,
        	 	ScheduleTo:prj.ScheduleTo,	
        	 	Task:prj.Task,
        	 	projectId:prj.ProjectID
        	 },
        	 updatefollowup:{
        	 	Substatus:"",
        	 	remarks:""
        	 },
        	 reassign:{
        	 	ScheduleTo:"",
        	 	remarks:""
        	 },
        	 current_status : "callaction",
        	 projectID:"",
        	 progress: 0
			}
		},

		methods: {
			dateformat(date) {
       		if(date != "") {
         	return Utils.formatDate(new Date(date))
      		 }
       
     		},
			openCalender() {
      			 this.showcalender = this.showcalender == 'hidden' ? 'visible' : 'hidden';
        
     		},
     		dayClicked(day) {
       			 this.showcalender = 'hidden';
    		 },
			resetDialogs() {
				this.completeVisible = false;
				this.updateVisible= false;
				this.reassignVisible = false;
			},
			editLead() {
				this.$router.push({
   				'name': 'addlead',
    			'params': {
        			'editLead': JSON.parse(localStorage.project)
    				}
   				})
			},
			goToHome() {
				this.$router.back(-1);
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
  			// changeformatDate(date){
  			// 	return (date.split("/").reverse().join("-"));
  			// },
  			editFollowup(){

  				var date = new Date();
  				var completedate = Utils.readableDate(date);
  				
  				this.input.Token = localStorage.ki;
  				this.input.StageHistoryID = this.StageHistoryID.toString();
  				this.input.CompletionRemark = this.CompletionRemark;
  				this.input.FollowupCompletionDate = completedate.split("/").reverse().join("-");
  				if (this.FllwDate!= ""){
  					this.input.FollowupDate = this.FllwDate;
  				} else{	
  				this.input.FollowupDate = this.FollowupDate.split("/").reverse().join("-");
  			    }
  				
  				if (this.updatefollowup.remarks != ""){
  				  this.input.Description = this.updatefollowup.remarks;  
  				}
  			  	if (this.reassign.remarks != ""){
  				 this.input.Description = this.reassign.remarks;
  			    }
  				this.input.UserID = Utils.getUserid(); 
  				if (this.reassign.ScheduleTo != null){
  					this.input.ScheduleTo = this.reassign.ScheduleTo;

  				}
  				
			    var data = this.input;
			     this.$validator.validate().then(valid => {
			     	
			     	if (valid) {
        				
	            		 FollowupsAPI.editFollowup(data).then(followups => {
	             		 // console.log(followups);
	             		 this.CompletionRemark = "";
	             		 this.updatefollowup.remarks = "";
	             		 this.input.Hr="";
	             		 this.input.Min = "";
	             		 this.input.Distance = "";
	             		 this.input.ClaimAmount = "",
						 this.reassign.remarks = "",
						 this.FllwDate = "",
	             		 this.completeVisible = false;
	             		 this.updateVisible = false;
	             		 this.reassignVisible = false;
   						}, error => {
              			console.error(error);
            			}); 
         	}
       			 })
// 
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
    		}),
 	  	  Utils.getScheduleto(payload).then(users => {
        this.scheduleTo = this.scheduleTo.concat(users.Body);
      
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
	font-size: 1.7em;
	color: #333;
}
.labels {
	margin-bottom: 10px;
}

.green-button{
	line-height: 25px;
	width: 83px;
    height: 37px;
}
.followdate {
  height: 22px;
  border-bottom: 1px solid #ccc;
}
.small-text {
	   color: #999;
	   font-size: 12px;
	   margin-bottom: 5px;   
}
.fllwdate {
	   color: #333;
	   border-bottom: 1px solid #999;
	   height: 18px;
	   font-size: 14px;
	   width:98%;
   }

</style>