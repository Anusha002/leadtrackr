<template>
	<v-ons-page id="addfollowuppage">
     <v-ons-toolbar>
        <div class="left">
            <v-ons-toolbar-button @click="toggleMenu()">
              <v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>  
            </v-ons-toolbar-button>
        </div>
        <div class="center">
          Add Followup
          </div>  
    </v-ons-toolbar>
		
  		<v-ons-list class="followup">
          <!-- <v-ons-list-item  modifier="nodivider">
            <div class="labels">Stage</div>
            <v-ons-select style="width: 100%" v-model="followup.Stage" name="stage" v-validate="'required'">
                <option value="" selected ></option>
                <option v-for="(item, key) in stages" :value="item" v-bind:key="key">
                  {{ item }}
                </option>
            </v-ons-select>
             <p class="text-danger">{{ errors.first('stage')}}</p> 
          </v-ons-list-item> -->
          <v-ons-list-item modifier="nodivider">
            <div class="labels">Task</div>
            <v-ons-select style="width: 100%" v-model="followup.Task" name="stage" v-validate="'required'">
                <option value="" selected ></option>
                <option v-for="(item, key) in tasks" :value="item" v-bind:key="key">
                  {{ item }}
                </option>
            </v-ons-select>
           <!-- <div class="followupdetails">
            <v-ons-input v-model="followup.Task" name="task" type="text" v-validate="'required'"></v-ons-input>
            <p class="text-danger" >{{ errors.first('task')}}</p> 
            </div> -->
          </v-ons-list-item>
          <v-ons-list-item modifier="nodivider" >
           <div class="followupdetails">
            <div class="labels" @click="openCalender()">Followup Date</div>
            <div class="followdate">{{dateformat(FllwDate)}}</div>
            <v-date-picker :popover-visibility="showcalender" :min-date='new Date()' mode='single' v-model="FllwDate" name="followupdate" v-validate="'required'" @dayclick='dayClicked'>
             </v-date-picker>
            
             <p class="text-danger">{{ errors.first('followupdate')}}</p> 
            </div>

          </v-ons-list-item> 
          <v-ons-list-item modifier="nodivider">
            <div class="labels">Description</div>
           <div class="leaddetails">
            <v-ons-input v-model="followup.Description"></v-ons-input>

            </div>
          </v-ons-list-item>          
          
          <v-ons-list-item modifier="nodivider"> 
            <div class="labels">ScheduleTo</div>
             <v-ons-select style="width: 100%" v-model="followup.ScheduleTo" name="scheduleto" v-validate="'required'">
                <option value="" selected data-default></option>
                <option v-for="(value,key) in scheduleTo" :value="value.FullName" v-bind:key="key">
                   {{ value.FullName }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('scheduleto')}}</p>
          </v-ons-list-item>  

          <v-ons-list-item modifier="nodivider"> 
            <div class="labels">Status</div>
             <v-ons-select style="width: 100%" v-model="followup.Status" name="status" v-validate="'required'">
                <option value="" selected data-default></option>
                <option v-for="(item,key) in status" :value="item" v-bind:key="key">
                  {{ item }}
                </option>
            </v-ons-select>
            <p class="text-danger" >{{ errors.first('status')}}</p>
          </v-ons-list-item> 
          <v-ons-list-item modifier="nodivider"  @click="addFile()">
           <div class="followupdetails">
             <div class="labels"> Add File Attachment </div> 
            </div>

          </v-ons-list-item>  

                  <br/><br/>
       </v-ons-list>
       
      <v-ons-bottom-toolbar><v-ons-button modifier="large" class="green-button full-width"  @click="addFollowup()">Save</v-ons-button></v-ons-bottom-toolbar>
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
        Stage: "Enquiry", 
        UserID:"",
        Task:"",
        CreatedDate: new Date(),
        FollowupDate: "",
        ScheduleBy: "", 
        ScheduleTo: "",
        Description:"",
        Status:"",
        Token:localStorage.ki 
      },
      FllwDate: "",
      showcalender: 'hidden',
      // stages:["Select Stage"],
      // status:["Select Status"],
      // // scheduleBy:[{'FullName': 'Schedule By'}],
      // scheduleTo: [{'FullName': 'Schedule To'}]
      // stages:[""],
      tasks:[""],
      status:[""],
      scheduleBy:[""],
      scheduleTo:[""],
      tasklist:[],
     }
   },
   methods: {
     addFile() {
        window.OurCodeWorld.Filebrowser.filePicker.single({
          success: function(data){
              if(!data.length){
              // No file selected
              return;
          }

          console.log(data);
          // Array with the file path
          // ["file:///storage/emulated/0/360/security/file.txt"]
          },
          // Start in a custom directory
          //startupPath:"/emulated/0/",
          error: function(err){
              console.log(err);
          }
      });
     },
     
     dateformat(date) {
       if(date != "") {
         return Utils.formatDate(new Date(date))
       }
       
     },
     openCalender() {
       this.showcalender = this.showcalender == 'hidden' ? 'visible' : 'hidden';
        
     },
     dayClicked(day) {
        this.showcalender = 'hidden';
     },
      goToHome() {

        this.$router.back(-1);
      },

    addFollowup(){
      
      this.submitted = true;
      var data = this.followup;
      this.followup.ProjectID = Utils.getProjectid();
      this.followup.CreatedDate = Utils.formatDate(new Date())
      this.followup.FollowupDate = Utils.formatDate(new Date(this.FllwDate))
      this.followup.ScheduleBy = Utils.getUsername()

      this.$validator.validate().then(valid => {

        if (valid) {
            AddfollowupApi.addFollowup(data).then(followups => {
              console.log('followup added');
            this.$router.push('/followups');

            }, error => {
               console.error(error);
            }); 
          }
        })
      }
    },
   mounted:function() {



    var user =  JSON.parse(localStorage.usr);
    this.followup.UserID = Utils.getUserid(); 
    this.followup.ProjectID = Utils.getProjectid();
    var payload = {
          Token:localStorage.ki,
          Department:user.Department,
          UserID:this.followup.UserID,
          ProjectID:Utils.getProjectid()

         }

    Utils.getStatus(payload).then(status => {
      this.status = this.status.concat(status.Body);
    }),

    Utils.getTask(payload).then(task => {  
      
      for (var i=0; i<task.Body.length; i++) {
        this.tasklist[i] = task.Body[i].Task;         
      }
      console.log(this.tasklist);
      this.tasks = this.tasks.concat(this.tasklist);
    }),
    // Utils.getStage(payload).then(stage => {
    //   this.stages = this.stages.concat(stage.Body);
    //   // this.stages = stage.Body;
      
      
    // }),
    // Utils.getUser(payload).then(users => {
      // this.scheduleBy = this.scheduleBy.concat(users.Body); 
      Utils.getScheduleto(payload).then(users => {
        this.scheduleTo = this.scheduleTo.concat(users.Body);
      
    })


  } 
}
</script>
<style scoped>

.followup {
  border-radius: 6px;
  margin: 0 15px;
}
.list {
  margin: 15px;
  background-color: none !important;
 
}
.followupdetails {
  width: 100%;
}
.labels{
  color:#3d5afe;    
  font-size: 14px;
  font-weight: 400;
  font-family: 'Roboto', 'Noto', sans-serif;
}

</style>