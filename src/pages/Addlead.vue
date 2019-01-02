<template>
	<v-ons-page id="addleadpage">
		<h1>Add Lead</h1>
  		<v-ons-list class="leaddata">
    		<v-ons-list-item>
     			 <div class="leaddetails">
     			 	<v-ons-input placeholder="LeadName" v-model="LeadName"></v-ons-input>
        		</div>
        	</v-ons-list-item>
          <v-ons-list-item> 
            <div class="leaddetails"> 
              <v-ons-input placeholder="ContactPerson" v-model="ContactPerson"></v-ons-input>
            </div>
          </v-ons-list-item>
        	<v-ons-list-item>	
        		<v-ons-select style="width: 100%">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in lead.Type" :value="Type">
                  {{value.TypeID}} {{value.TypeName }}
                </option>
            </v-ons-select>
        	</v-ons-list-item>	
          <v-ons-list-item>
           <div class="leaddetails">
            <v-ons-input placeholder="Stage" v-model="Stage"></v-ons-input>
            </div>
          </v-ons-list-item>

          <v-ons-list-item> 
             <v-ons-select style="width: 100%">
                <option value="" selected data-default></option>
                <option v-for="item in lead.Status" :value="item">
                  {{ item }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
        	
        	<v-ons-list-item>	
        		<div class="leaddetails">			
        			<v-ons-input placeholder="Mobile" v-model="Mobile" type="number"></v-ons-input>
      			 </div>
    		</v-ons-list-item>
    		<v-ons-list-item>
     			 <div class="leaddetails">
        			<v-ons-input placeholder="Landline" v-model="landLine"  type="number"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">
        			<v-ons-input placeholder="Email" v-model="Email"  type="email"></v-ons-input>
        		</div>	
        	</v-ons-list-item>	
          <v-ons-list-item>
           <div class="leaddetails">
            <v-ons-input placeholder="Description" v-model="Description"></v-ons-input>
            </div>
          </v-ons-list-item>
          <v-ons-list-item> 
             <v-ons-select style="width: 100%">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in lead.CreatedBy" :value="user">
                  {{value.UserID}} {{ value.FullName }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
          <v-ons-list-item> 
             <v-ons-select style="width: 100%">
                <option value="" selected data-default></option>
                <option v-for="(value,key) in lead.HandledBy" :value="user">
                   {{value.UserID}} {{ value.FullName }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
        	<v-ons-list-item> 
             <v-ons-select style="width: 100%">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in lead.OwnedBy" :value="user">
                  {{value.UserID}} {{ value.FullName }}
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
import UserApi from '../services/api/Utils.js';
import AddleadApi from '../services/api/Utils.js';

export default{
    data() {
    return {
      lead: {
      LeadName: "", 
      Type:[{'TypeName':'Select Type'}],
      Stage:'',
      Status:["Select Status"],
      ContactPerson: "",
      Mobile: "",
      landLine: "", 
      Email: "",
      Description:'',
      CreatedBy;[{'FullName': 'Created By'}],
      HandledBy: [{'FullName': 'Handled By'}],
      OwnedBy: [{'FullName': 'Owned By'}]
      
      },
      submitted: false,
      response: {}
     	} 
	 },

  mounted:function() {
    var payload = {
          Token:localStorage.ki

         }
        
    StatusApi.getStatus(payload).then(statuses => {
      this.lead.status = this.lead.status.concat(statuses.Body);
    }),

    TypeApi.getType(payload).then(types => {
      this.lead.types = this.lead.types.concat(types.Body);   
    }),

    UserApi.getUser(payload).then(users => {
      this.lead.CreatedBy = this.lead.CreatedBy.concat(users.Body); 
      this.lead.OwnedBy = this.lead.OwnedBy.concat(users.Body); 
      this.lead.HandledBy = this.lead.HandledBy.concat(users.Body);
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
