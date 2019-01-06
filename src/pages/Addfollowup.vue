<template>
	<v-ons-page id="addfollowuppage">
		<h1>Add Followup</h1>
  		<v-ons-list class="followup">
    		<v-ons-list-item>
     			 <div class="followupdetails">
     			 	<v-ons-input placeholder="ProjectID" v-model="items.ProjectID"></v-ons-input>
        		</div>
        	</v-ons-list-item>
          <v-ons-list-item>
           <v-ons-select style="width: 100%" v-model="followup.Stage">
                <option value="" selected data-default></option>
                <option v-for="item in stages" :value="item">
                  {{ item }}
                </option>
            </v-ons-select>
          </v-ons-list-item>
          <v-ons-list-item>
           <div class="followupdetails">
            <v-ons-input placeholder="UserID" v-model="followup.UserID"></v-ons-input>
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
           <div class="followupdetails">
            <v-ons-input placeholder="Task" v-model="followup.Task"></v-ons-input>
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
           <div class="followupdetails">
            
            <v-date-picker mode='single'v-model="followup.FollowupDate">
             </v-date-picker>
            </div>

          </v-ons-list-item>
          <v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="followup.ScheduleBy">
               <option value="" selected data-default></option>
                <option v-for="(value,key) in scheduleBy" :value="value.UserID">
                  {{ value.FullName }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
          <v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="followup.ScheduleTo">
                <option value="" selected data-default></option>
                <option v-for="(value,key) in scheduleTo" :value="value.UserID">
                   {{ value.FullName }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
          <v-ons-list-item>
           <div class="leaddetails">
            <v-ons-input placeholder="Description" v-model="followup.Description"></v-ons-input>
            </div>
          </v-ons-list-item>
          <v-ons-list-item> 
             <v-ons-select style="width: 100%" v-model="followup.Status">
                <option value="" selected data-default></option>
                <option v-for="item in status" :value="item">
                  {{ item }}
                </option>
            </v-ons-select>
          </v-ons-list-item>  
          <v-ons-list-item>
          <v-ons-button  style="margin: 6px 4px" @click="goToHome()">Cancel</v-ons-button>
          <v-ons-button  style="margin: 6px 4px" @click="addFollowup()">Save</v-ons-button>
        </v-ons-list-item>           
       </v-ons-list>
  </v-ons-page>   
</template>

<script>
import Utils from '../services/api/Utils.js';
import AddfollowupApi from '../services/api/Followup.js';

export default{

    name: 'Addfollowup',
    props: ['items'],
    data() {
    return {
      followup: {
      ProjectID: "",
      Stage: "", 
      UserID:"",
      Task:"",
      CreatedDate: new Date(),
      FollowupDate: "",
      ScheduleBy: "", 
      ScheduleTo: "",
      Description:"",
      CreatedBy:"",
      Status:"",
      Token:localStorage.ki 
      },
      stages:["Select Stage"],
      status:["Select Status"],
      scheduleBy:[{'FullName': 'Schedule By'}],
      scheduleTo: [{'FullName': 'Schedule To'}]
     }
   },
   methods: {

      goToHome() {
        this.$router.push('/followups')
      },

    addFollowup(){
      
      this.submitted = true;
      var data = this.followup;
      this.followup.CreatedDate = Utils.formatDate(new Date())
      this.followup.FollowupDate = Utils.formatDate(new Date(data.FollowupDate))
      AddfollowupApi.addFollowup(data).then(followups => {

        console.log("followup added successfully");
        this.$router.push('/followups');

    }, error => {
        console.error(error);
       }); 
     }
  },
   mounted:function() {
    var payload = {
          Token:localStorage.ki

         }

     var user =  JSON.parse(localStorage.usr);
     this.followup.UserID = user.UserID; 

    Utils.getStatus(payload).then(status => {
      this.status = this.status.concat(status.Body);
    }),

    Utils.getStage(payload).then(stage => {
      this.stages = this.stages.concat(stage.Body);
      
    }),
    Utils.getUser(payload).then(users => {
      this.scheduleBy = this.scheduleBy.concat(users.Body); 
      this.scheduleTo = this.scheduleTo.concat(users.Body);
      
    })


  } 
}
</script>
<style>
.list {
  margin: 15px;
  background-color: none !important;
 
}

</style>