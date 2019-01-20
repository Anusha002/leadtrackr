<template>
<div>
      
	<v-ons-page id="addleadpage">
    <v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button>
	        		<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="center">
    			Add Lead
	        </div>	
 		</v-ons-toolbar>

  		<v-ons-list class="leaddata">
    		<v-ons-list-item modifier="nodivider">
            <div class="labels">LeadName</div>
     			 	<v-ons-input modifier="underbar" class="lead-input"  v-model="lead.LeadName" v-validate="'required'" name="leadname" type="text"></v-ons-input>
            <p class="text-danger" >{{ errors.first('leadname')}}</p> 
        	</v-ons-list-item>
          <v-ons-list-item  modifier="nodivider"> 
            <div class="labels">ContactName</div>
            <v-ons-input v-model="lead.ContactName" modifier="underbar" class="lead-input" name="contactname" v-validate="'required'"></v-ons-input>
            <p class="text-danger" >{{ errors.first('contactname')}}</p> 
          </v-ons-list-item>
        	<v-ons-list-item modifier="nodivider">	
            <div class="labels">Type</div>
        		<v-ons-select style="width: 100%" v-model="lead.Type"  name="leadtype" v-validate="'required'" >   
               <option value="" selected data-default></option>
                <option v-for="(value,key) in types" :value="value.TypeID" v-bind:key="key">
                  {{value.TypeName }} 
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('leadtype')}}</p>
        	</v-ons-list-item>	
          <v-ons-list-item modifier="nodivider">
            <div class="labels">Stage</div>
           <v-ons-select style="width: 100%" v-model="lead.Stage" name="stage" v-validate="'required'">
                <option value="" selected data-default></option>
                <option v-for="(item,key) in stages" :value="item" v-bind:key="key">
                  {{ item }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('stage')}}</p>
          </v-ons-list-item>

          <v-ons-list-item modifier="nodivider"> 
            <div class="labels">Status</div>
             <v-ons-select style="width: 100%" v-model="lead.Status" name="status" v-validate="'required'">
                <option value="" selected data-default></option>
                <option v-for="(item,key) in status" :value="item" v-bind:key="key">
                  {{ item }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('status')}}</p>
          </v-ons-list-item>  
        	
        	<v-ons-list-item modifier="nodivider">	
          <div class="labels">Mobile</div>		
        			<v-ons-input v-model="lead.Mobile" type="number" modifier="underbar" class="lead-input" v-validate="'required|digits:10'" name="mobile" ></v-ons-input>
              <p class="text-danger" >{{ errors.first('mobile')}}</p>
    		</v-ons-list-item>
    		<v-ons-list-item modifier="nodivider">
             <div class="labels">Landline</div>
        			<v-ons-input v-model="lead.landLine"  type="number" modifier="underbar" class="lead-input"></v-ons-input>
        	</v-ons-list-item>
        	<v-ons-list-item modifier="nodivider">
              <div class="labels">Email</div>	
        			<v-ons-input v-model="lead.Email"  type="email" modifier="underbar" class="lead-input" v-validate="'required|email'" name="email"></v-ons-input>
              <p class="text-danger" >{{ errors.first('email')}}</p>
        	</v-ons-list-item>	
          <v-ons-list-item modifier="nodivider">
            <div class="labels">Description</div>
            <v-ons-input v-model="lead.Description" modifier="underbar" class="lead-input"></v-ons-input>
          </v-ons-list-item> 
          <v-ons-list-item modifier="nodivider"> 
            <div class="labels">HandledBy</div>
             <v-ons-select style="width: 100%" v-model="lead.HandledBy" v-validate="'required'" name="handledby">
                <option value="" selected data-default></option>
                <option v-for="(value,key) in handledBy" :value="value.UserID" v-bind:key="key">
                   {{ value.FullName }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('handledby')}}</p>
          </v-ons-list-item>  
        	<v-ons-list-item modifier="nodivider"> 
            <div class="labels">OwnedBy</div>
             <v-ons-select style="width: 100%" v-model="lead.OwnedBy" v-validate="'required'" name="ownedby">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in ownedBy" :value="value.UserID" v-bind:key="key">
                  {{ value.FullName }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('ownedby')}}</p>
          </v-ons-list-item>  
           <v-ons-list-item modifier="nodivider"  @click="addLocation()">
           <div class="followupdetails">
            <div class="labels">Add Location</div>
            
            </div>

          </v-ons-list-item> 	

    
  		</v-ons-list>
      <v-ons-bottom-toolbar><v-ons-button modifier="large" class="green-button full-width"  @click="addLead()">Save</v-ons-button></v-ons-bottom-toolbar>
	</v-ons-page>   
  </div>
</template>

<script>

import Utils from '../services/api/Utils.js';
import AddleadApi from '../services/api/Leads.js';

export default{
    props: ['items'],
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
      CreatedBy:Utils.getUserid(),
      HandledBy:"",
      OwnedBy: "",
      Token:localStorage.ki
      
      },
      // types: [{'TypeName':'Select Type'}],
      // stages:["Select Stage"],
      // status:["Select Status"],
      // createdBy:[{'FullName': 'Created By'}],
      // handledBy: [{'FullName': 'Handled By'}],
      // ownedBy: [{'FullName': 'Owned By'}],
      types: [""], 
      stages:[""],
      status:[""],
      createdBy:[""],
      handledBy: [""],
      ownedBy: [""],
      submitted: false,
      response: {}
     	} 
	 },

  mounted:function() {
    // localStorage.removeItem('leaddata');

    if(localStorage.getItem('leaddata') != null ){
         this.lead = JSON.parse(localStorage.getItem('leaddata'))
         console.log(this.lead.Type);
      }

    var user = JSON.parse(localStorage.usr)
    var payload = {
          Token:localStorage.ki,
          Department:user.Department
         }

    
    Utils.getStatus(payload).then(status => {
      this.status = this.status.concat(status.Body);
    }),

    Utils.getType(payload).then(types => {
      this.types = this.types.concat(types.Body);   
    }),
    Utils.getStage(payload).then(stage => {
      this.stages = this.stages.concat(stage.Body);
      
    }),
    Utils.getUser(payload).then(users => {
      this.createdBy = this.createdBy.concat(users.Body); 
      this.ownedBy = this.ownedBy.concat(users.Body); 
      this.handledBy = this.handledBy.concat(users.Body);
    })
    
  },

  methods :{
    addLocation() {
      localStorage.setItem('leaddata', JSON.stringify(this.lead));
      console.log(localStorage.leaddata);
      this.$router.push('/addlocation');
    },
    goToHome(){
      if(typeof this.$props.items == "undefined"){
        this.$router.back(-1);
      } else {
        this.$router.go(-3);
      }
      
    },
    addLead(){
      this.submitted = true;
      console.log(this.lead);
      this.$validator.validate().then(valid => {
      if (valid) {
          AddleadApi.addLead(this.lead).then(projects => {

            console.log("Lead added successfully");
            localStorage.removeItem('leaddata');
            this.$router.push('/container');

        }, error => {
            console.error(error);
           });
        }
       })     
    }
  }

    
}
</script>

<style scoped>

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

.labels{
  color:#3d5afe;    
  font-size: 14px;
  font-weight: 400;
  font-family: 'Roboto', 'Noto', sans-serif;
}

 </style>  
