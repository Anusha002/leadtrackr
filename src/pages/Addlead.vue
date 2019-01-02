<template>
	<v-ons-page id="addleadpage">
		<h1>Add Lead</h1>
  		<v-ons-list class="leaddata">
    		<v-ons-list-item>
     			 <div class="leaddetails">
     			 	<v-ons-input placeholder="Lead name" v-model="leadname"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<v-ons-select style="width: 100%">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in lead.types" :value="type">
                  {{value.TypeID}} {{value.TypeName }}
                </option>
            </v-ons-select>
        	</v-ons-list-item>	
          <v-ons-list-item> 
             <v-ons-select style="width: 100%">
                <option value="" selected data-default></option>
                <option v-for="item in lead.status" :value="item">
                  {{ item }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
        	<v-ons-list-item>	
        		<div class="leaddetails">	
        			<v-ons-input placeholder="Contact name" v-model="contactname"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">			
        			<v-ons-input placeholder="Contact number" v-model="contactnumber" type="number"></v-ons-input>
      			 </div>
    		</v-ons-list-item>
    		<v-ons-list-item>
     			 <div class="leaddetails">
        			<v-ons-input placeholder="Land Line" v-model="landline"  type="number"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">
        			<v-ons-input placeholder="Email" v-model="email"  type="email"></v-ons-input>
        		</div>	
        	</v-ons-list-item>	
        	<v-ons-list-item> 
             <v-ons-select style="width: 100%">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in lead.ownedby" :value="user">
                  {{value.UserID}} {{ value.FullName }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
        	<v-ons-list-item> 
             <v-ons-select style="width: 100%">
                <option value="" selected data-default></option>
                <option v-for="(value,key) in lead.handledby" :value="user">
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
      leadname: "", 
      types:[{'TypeName':'Select Type'}],
      status:["Select Status"],
      contactname: "",
      contactnumber: "",
      landline: "", 
      email: "",
      ownedby: [{'FullName': 'Owned By'}],
      handledby: [{'FullName': 'Handled By'}]
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
      console.log(users.Body);
      this.lead.ownedby = this.lead.ownedby.concat(users.Body); 
      this.lead.handledby = this.lead.handledby.concat(users.Body);
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
