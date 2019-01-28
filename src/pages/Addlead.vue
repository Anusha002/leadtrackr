<template>
<div>
      
	<v-ons-page id="addleadpage">
    <v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button>
	        		<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="center" v-if="typeof editLead == 'undefined'">
    			Add Lead
	      </div>	
        <div class="center" v-else>
    			Edit Lead
	        </div>	

 		</v-ons-toolbar>
     <v-ons-progress-bar :value="progress"></v-ons-progress-bar>

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
               <option value="" selected ></option>
                <option v-for="(value,key) in types" :value="value.TypeID" v-bind:key="key">
                  {{value.TypeName }} 
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('leadtype')}}</p>
        	</v-ons-list-item>	
          <v-ons-list-item modifier="nodivider">
            <div class="labels">Stage</div>
      
           <v-ons-select style="width: 100%" v-model="lead.Stage" name="stage" v-validate="'required'">
                <option value="" selected></option>
                <option v-for="item in stages" :value="item" >
                  {{ item }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('stage')}}</p>
          </v-ons-list-item>

          <v-ons-list-item modifier="nodivider"> 
            <div class="labels">Status</div>
             <v-ons-select style="width: 100%" v-model="lead.Status" name="status" v-validate="'required'">
                <option value="" selected></option>
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
                <option value="" selected></option>
                <option v-for="(value,key) in handledBy" :value="value.UserID" >
                   {{ value.FullName }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('handledby')}}</p>
          </v-ons-list-item>  
        	<v-ons-list-item modifier="nodivider"> 
            <div class="labels">OwnedBy {{lead.OwnedBy}}</div>
             <v-ons-select style="width: 100%" v-model="lead.OwnedBy" v-validate="'required'" name="ownedby">
                <option value="" selected></option>
                <option v-for="(value,key) in ownedBy" :value="value.UserID" >
                  {{ value.FullName }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('ownedby')}}</p>
          </v-ons-list-item>  
           <v-ons-list-item modifier="nodivider"  @click="addLocation()">
           
            <div class="labels">Add Location</div>
            <div v-if="typeof items != 'undefined'" style="width:100%">
              <gmap-map
                :center="center"
                :zoom="16"
                style="width:100%;  height: 120px;"
              >
                
              </gmap-map>
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
import EditleadApi from '../services/api/Leads.js';


export default{
    props: ['items','editLead'],
    data() {
      
    return {
      progress: 0,
      
      lead: {
        LeadName: "",
        ContactName: "", 
        Type:"",
        Stage:"",
        Status:"",
        Mobile: "",
        landLine: "", 
        Email: "",
        Description:"",
        CreatedBy:Utils.getUserid(),
        CreatedByName:"",
        HandledBy:"",
        HandledByName:"",
        OwnedBy: "",
        OwnerName:"",
        Latitude:"",
        Longitude:"",
        Token:localStorage.ki
        
      },
      
      types: [""], 
      stages: [""],
      status: [""],
      createdBy:[""],
      handledBy: [""],
      ownedBy: [""],
      center: {
        lat: 0,
        lng: 0
      },
      submitted: false,
      response: {}
     	} 
	 },

  mounted:function() {
    
    var user = JSON.parse(localStorage.usr)
    var payload = {
          Token:localStorage.ki,
          Department:user.Department
         }
      
    this.intervalID = setInterval(() => {
			if (this.progress === 100) {
        clearInterval(this.intervalID);
        this.progress = 0;
				return;
			}
			this.progress++;
		}, 40);
    
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

      var that = this;
      setTimeout(function(){
        that.progress = 100
        if(that.$props.editLead != null) {
          that.lead =  that.$props.editLead;
          that.lead.OwnedBy = that.lead.OwnedBy.toString();
        }
        if(typeof that.$props.items != 'undefined' && that.$props.items != "") {
          that.lead =  JSON.parse(localStorage.leaddata);
          if(that.$props.items.lat != "" && that.$props.items.lng != "" ) {
              that.lead.Latitude = that.$props.items.lat;
              that.lead.Longitude = that.$props.items.lng;
              that.center = {lat: that.lead.Latitude, lng: that.lead.Longitude}
              
          }
          
        }
      }, 200)
      
    })
    // localStorage.removeItem('leaddata');
    navigator.geolocation.getCurrentPosition(function(position){})



    
    
    
  },

  methods :{
    addLocation() {
      localStorage.setItem('leaddata', JSON.stringify(this.lead));
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

      // console.log(this.lead);
      this.$validator.validate().then(valid => {
      if (valid) {
        this.intervalID = setInterval(() => {
          if (this.progress === 100) {
            clearInterval(this.intervalID);
            this.progress = 0;
            return;
          }
          this.progress++;
        }, 40);
        if (this.$props.editLead != null) {
          this.lead.Token = localStorage.ki;
          console.log(this.lead);
          EditleadApi.editLead(this.lead).then(projects => {
            this.progress = 0;
            this.$router.push('/container');

          },error => {
            console.error(error);
           });
        } else {
        //   AddleadApi.addLead(this.lead).then(projects => {
        //      this.progress = 0; 
        //     localStorage.removeItem('leaddata');
        //     this.$router.push('/container');
        // }, error => {
        //     console.error(error);
        //    });
        }
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





 </style>  
