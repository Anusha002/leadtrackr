<template>
	<v-ons-page id="addleadpage">
		<h1>Add Lead</h1>
  		<v-ons-list class="leaddata">
    		<v-ons-list-item>
     			 <div class="leaddetails">
     			 	<v-ons-input placeholder="LeadName" v-model="lead.LeadName"></v-ons-input>
        		</div>
        	</v-ons-list-item>
          <v-ons-list-item> 
            <div class="leaddetails"> 
              <v-ons-input placeholder="ContactPerson" v-model="lead.ContactPerson"></v-ons-input>
            </div>
          </v-ons-list-item>
        	<v-ons-list-item>	
        		<v-ons-select style="width: 100%" v-model="lead.Type">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in types" :value="value.TypeID">
                  {{value.TypeName }} 
                </option>
            </v-ons-select>
        	</v-ons-list-item>	
          <v-ons-list-item>
           <v-ons-select style="width: 100%" v-model="lead.Stage">
                <option value="" selected data-default></option>
                <option v-for="item in stages" :value="item">
                  {{ item }}
                </option>
            </v-ons-select>
          </v-ons-list-item>

          <v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="lead.Status">
                <option value="" selected data-default></option>
                <option v-for="item in status" :value="item">
                  {{ item }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
        	
        	<v-ons-list-item>	
        		<div class="leaddetails">			
        			<v-ons-input placeholder="Mobile" v-model="lead.Mobile" type="number"></v-ons-input>
      			 </div>
    		</v-ons-list-item>
    		<v-ons-list-item>
     			 <div class="leaddetails">
        			<v-ons-input placeholder="Landline" v-model="lead.landLine"  type="number"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">
        			<v-ons-input placeholder="Email" v-model="lead.Email"  type="email"></v-ons-input>
        		</div>	
        	</v-ons-list-item>	
          <v-ons-list-item>
           <div class="leaddetails">
            <v-ons-input placeholder="Description" v-model="lead.Description"></v-ons-input>
            </div>
          </v-ons-list-item>
          <v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="lead.CreatedBy">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in createdBy" :value="value.UserID">
                  {{ value.FullName }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
          <v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="lead.HandledBy">
                <option value="" selected data-default></option>
                <option v-for="(value,key) in handledBy" :value="value.UserID">
                   {{ value.FullName }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
        	<v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="lead.OwnedBy">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in ownedBy" :value="value.UserID">
                  {{ value.FullName }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  	

    		<v-ons-list-item>
	    		<v-ons-button  style="margin: 6px 4px">Cancel</v-ons-button>
	    		<v-ons-button  style="margin: 6px 4px" @click="addLead()">Save</v-ons-button>
	    	</v-ons-list-item>
    
  		</v-ons-list>
	</v-ons-page>   
</template>

<script>
import StatusApi from '../services/api/Utils.js';
import TypeApi from '../services/api/Utils.js';
import StageApi from '../services/api/Utils.js';
import UserApi from '../services/api/Utils.js';
import AddleadApi from '../services/api/Leads.js';

export default{
    data() {
    return {
      lead: {
      LeadName: "",
      ContactPerson: "", 
      Type:"",
      Stage:"",
      Status:"",
      Mobile: "",
      landLine: "", 
      Email: "",
      Description:"",
      CreatedBy:"",
      HandledBy:"",
      OwnedBy: "",
      Token:localStorage.ki
      
      },
      types: [{'TypeName':'Select Type'}],
      stages:["Select Stage"],
      status:["Select Status"],
      createdBy:[{'FullName': 'Created By'}],
      handledBy: [{'FullName': 'Handled By'}],
      ownedBy: [{'FullName': 'Owned By'}],
      submitted: false,
      response: {}
     	} 
	 },

  mounted:function() {
    var payload = {
          Token:localStorage.ki

         }
        
    StatusApi.getStatus(payload).then(status => {
      this.status = this.status.concat(status.Body);
    }),

    TypeApi.getType(payload).then(types => {
      this.types = this.types.concat(types.Body);   
    }),
    StageApi.getStage(payload).then(stage => {
      this.stages = this.stages.concat(stage.Body);
      
    }),
    UserApi.getUser(payload).then(users => {
      this.createdBy = this.createdBy.concat(users.Body); 
      this.ownedBy = this.ownedBy.concat(users.Body); 
      this.handledBy = this.handledBy.concat(users.Body);
    })
  },

  methods :{
    addLead(){
      this.submitted = true;
      console.log(this.lead);
      AddleadApi.addLead(this.lead).then(projects => {

        console.log("Lead added successfully");
        this.$router.push('/container');

    }, error => {
        console.error(error);
       }); 
    }
  }
}
</script>

<style>

.list {
  background-color: #fff !important;
 
}
.leaddata{
	border: 1px;
	margin: 20px;
	border-radius: 6px;
}

h1{
	text-align: center;
	color: #fff;
	font-size: 8px;
}


 </style>  
