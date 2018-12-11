
<template id="actions">

</template>
<template id="leaddetail">
	<v-ons-page id="leaddetailpage">
		<h1 class="heading">{{lead_name}}</h1>
 		<v-ons-card>
 			<div class="content">	
				<span><b>{{contact_name}}</b></span>
				<p class="status" >{{status}}</p>
	 		</div> 						
 		</v-ons-card>

 		<h1 class="heading">Follow UPS</h1>
 		<v-ons-card>
 			<div class="content">	
				<span><b>Call {{contact_name}}<br> For Demo</b></span>			
	 		</div> 
	 		<div id="callaction" v-if="current_status=='callaction'">
	 			<v-ons-list-item>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px" @click="changeMode('completedtask')">Mark Completed</v-ons-button>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px"@click="changeMode('updatefollowup')">Update</v-ons-button>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px" @click="changeMode('reassign')">Reassign</v-ons-button>
	    	</v-ons-list-item>
	 		</div>	

	 		<div id="completedtask" v-if="current_status=='completedtask'">
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
	    				<v-ons-button  style="margin: 6px 4px" @click="changeMode('callaction')">Cancel</v-ons-button>
	    			
	    				<v-ons-button  style="margin: 6px 4px">Save</v-ons-button>
	    			</v-ons-col>
	    		</v-ons-row>
	    	
	 		</div>

	 		<div id="updatefollowup" v-if="current_status=='updatefollowup'">
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
	    				<v-ons-button  style="margin: 6px 4px" @click="changeMode('callaction')">Cancel</v-ons-button>
	    			
	    				<v-ons-button  style="margin: 6px 4px">Save</v-ons-button>
	    			</v-ons-col>
	    		</v-ons-row>
	    	
	 		</div>

	 		<div id="reassign" v-if="current_status=='reassign'">
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
	    				<v-ons-button  style="margin: 6px 4px" @click="changeMode('callaction')">Cancel</v-ons-button>
	    			
	    				<v-ons-button  style="margin: 6px 4px">Save</v-ons-button>
	    			</v-ons-col>
	    		</v-ons-row>
	    	
	 		</div>

 		</v-ons-card>

	</v-ons-page>
</template>


<script>
	export default {
		name: "Leaddetail",
		data() {
			return {
			"lead_name": "Global Agencies",
        	 "status": "Sale order released",
        	 "contact_name": "Ajay K",
        	 input: {
        	 	remarks: "",
        	 	timetaken: "",
        	 	traveldistance: "",
        	 	updatestatus: "",
        	 	updatetime: "",
        	 	updatedistance: "",
        	 	updateremarks: ""
        	 },
        	 current_status : "callaction"
			}
		},

		methods: {
			changeMode(mode) {
				this.current_status = mode;
			}
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

.btnclass{
	font-size: 14px;
	color: "black";
	background-color: grey;

}

.rowdata{
	padding-top:15px;
	font-size:16px;
}



</style>