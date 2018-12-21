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
        		<v-ons-select style="width: 100%" v-model="selectedType">
               <option value="" selected data-default></option>
                <option v-for="type in types" :value="type">
                  {{ type }}
                </option>
            </v-ons-select>
        	</v-ons-list-item>	
          <v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="selectedStatus">
                <option value="" selected data-default></option>
                <option v-for="item in status" :value="item">
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
             <v-ons-select style="width: 100%" v-model="selectedOwner">
               <option value="" selected data-default></option>
                <option v-for="user in ownedby" :value="user">
                  {{ user }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
        	<v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="selectedHandler">
                <option value="" selected data-default></option>
                <option v-for="user in handledby" :value="user">
                  {{ user }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  

    		<v-ons-list-item>
	    		<v-ons-button  style="margin: 6px 4px">Cancel</v-ons-button>
	    		<v-ons-button  style="margin: 6px 4px">Save</v-ons-button>
	    	</v-ons-list-item>
    
  		</v-ons-list>
	</v-ons-page>   
</template>

<script>
import StatusApi from '../services/api/Utils.js';
import TypeApi from '../services/api/Utils.js';
import UserApi from '../services/api/Utils.js';

export default{
    data() {
    return {
      leadname: "", 
      types:["Select Type"],
      status:["Select Status"],
      contactname: "",
      contactnumber: "",
      landline: "", 
      email: "",
      ownedby: ["Select Owner"],
      handledby: ["Select Handler"],
      selectedType: "",
      selectedStatus: "",
      selectedOwner: "",
      selectedHandler: ""


      
     	} 
	 },
  mounted:function() {
    var payload = {
          Token:localStorage.ki

         }
        
    StatusApi.getStatus(payload).then(statuses => {
      this.status = this.status.concat(statuses.Body);
    }),
    TypeApi.getType(payload).then(types => {
      console.log(types.Body);
      this.types = this.types.concat(types);
    }),
    UserApi.getUser(payload).then(users => {
      this.ownedby = this.ownedby.concat(users);
      this.handledby = this.handledby.concat(users);
    
    })
  } 

}
</script>

<style>
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
