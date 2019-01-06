<template>
<div>
      
	<v-ons-page id="addleadpage">
    <div class="header">
      
    		<div class="left">
	      		<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>
          </div>
          <div class="center">Add Lead</div>
    </div>
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

    
  		</v-ons-list>
      <v-ons-bottom-toolbar><v-ons-button modifier="large" class="green-button full-width"  @click="addLead()">Save</v-ons-button></v-ons-bottom-toolbar>
	</v-ons-page>   
  </div>
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
    goToHome(){
        this.$router.push('/container');
    },
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

.page {
  background-color: transparent;
}
.list {
  background-color: #fff !important;
 
}
.leaddata{
	border: 1px;
	margin: 20px;
  border-radius: 6px;
  margin-top: 70px !important;
}

h1{
	text-align: center;
	color: #fff;
	font-size: 8px;
}
.header {
  position: fixed;
  height: 60px;
  background: rgba(8,179,222,1) 10%;
  width: 100%;
  z-index: 100;
  color: #fff;
}
.header .left {
  width: 24%;
  text-align: left;
  -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-clip: padding-box;
    display: inline-block;
    line-height: 60px;
}
.header .center {
  width: 46%;
  text-align: center;
  -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-clip: padding-box;
    display: inline-block;
    line-height: 60px;
    font-weight: bold;
    font-size: 1.2em;
    
}
.header-icon {
  color: #fff;
  font-size: 1.4em !important;
}

.toolbar .center {
  color: #fff;
}

 </style>  
