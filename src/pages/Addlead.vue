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
               <option value="" selected data-default>Type</option>
                <option v-for="type in types" :value="type">
                  {{ type }}
                </option>
            </v-ons-select>
        	</v-ons-list-item>	
          <v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="selectedStatus">
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
        			<v-ons-input placeholder="Contact number" v-model="contactnumber"></v-ons-input>
      			 </div>
    		</v-ons-list-item>
    		<v-ons-list-item>
     			 <div class="leaddetails">
        			<v-ons-input placeholder="Land Line" v-model="landline"></v-ons-input>
        		</div>
        	</v-ons-list-item>
        	<v-ons-list-item>	
        		<div class="leaddetails">
        			<v-ons-input placeholder="Email" v-model="email"></v-ons-input>
        		</div>	
        	</v-ons-list-item>	
        	<v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="selectedOwner">
                <option v-for="user in ownedby" :value="user">
                  {{ user }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
        	<v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="selectedHandler">
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
      types:[],
      status:[],
      contactname: "",
      contactnumber: "",
      landline: "", 
      email: "",
      ownedby: [],
      handledby: []
      
     	} 
	 },
  mounted:function() {
    var payload = {
          Tk:localStorage.ki
         }
    StatusApi.getStatus(payload).then(statuses => {
      this.status = statuses;
      
    }),
    TypeApi.getType(payload).then(types => {
      this.types = types;
      console.log(this.types); 
    }),
    UserApi.getUser(payload).then(users => {
      this.ownedby = users;
      this.handledby = users;
      console.log(this.ownedby); 
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
