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
    <v-ons-progress-bar :value="progress"></v-ons-progress-bar> 
		
  		<v-ons-list class="followup">
          
          <v-ons-list-item modifier="nodivider">
            <div class="labels">Task</div>
            <v-ons-select style="width: 100%" v-model="followup.Task" name="task" v-validate="'required'">
                <option value="" selected ></option>
                <option v-for="(item, key) in tasks" :value="item" v-bind:key="key">
                  {{ item }}
                </option>
            </v-ons-select>
           
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
            <v-ons-input v-model="followup.Description" name="description" v-validate="'required'"></v-ons-input>
            <p class="text-danger">{{ errors.first('description')}}</p> 
           
          </v-ons-list-item>          
          
          <v-ons-list-item modifier="nodivider"> 
            <div class="labels">ScheduleTo</div>
           </v-ons-list-item> 
           <div class="userlist">
              <v-ons-list-item v-for="(value, $index) in scheduleTo" :key="value" tappable>
                
                <label class="left">
                  <v-ons-checkbox :input-id="$index +'checkbox-' " :value="value.UserID + '|' + value.FullName" v-model="followup.ScheduleToList" >
                  </v-ons-checkbox>
              </label>
              <label class="center" :for="'checkbox-' + $index">
                {{value.FullName}}
              </label>
               </v-ons-list-item>  
           </div>
            <!--  <v-ons-select style="width: 100%" v-model="followup.ScheduleTo" name="scheduleto" v-validate="'required'">
                <option value="" selected data-default></option>
                <option v-for="(value,key) in scheduleTo" :value="value.FullName" v-bind:key="key">
                   {{ value.FullName }}
                </option>
            </v-ons-select> -->
            <!-- <p class="text-danger" >{{ errors.first('scheduleto')}}</p> -->


          

           <!-- <v-ons-list-item modifier="nodivider"  @click="addFile()">
           <div class="followupdetails">
             <div class="labels"> Add File Attachment </div> 
            </div>
            <img v-if="followup.Attachment != ''" :src="followup.Attachment " width="90" />

          </v-ons-list-item>   -->

                  <!-- <br/><br/><br><br><br> -->

       </v-ons-list>
       
      <v-ons-bottom-toolbar><v-ons-button modifier="large" class="green-button full-width"  @click="addFollowup()">Save</v-ons-button></v-ons-bottom-toolbar>
  </v-ons-page>   
</template>

<script>
import Utils from '../services/api/Utils.js';
import AddfollowupApi from '../services/api/Followup.js';
import Vue from 'vue';

export default{

    name: 'Addfollowup',
    
    props: ['items'],
    data() {
    return {
      progress: 0,
      progress1:0,
      followup: {
        ProjectID: "",
        Stage: "Enquiry", 
        UserID:"",
        Task:"",
        CreatedDate: new Date(),
        FollowupDate: "",
        ScheduleBy: "", 
        // ScheduleTo: "",
        Description:"",

        ScheduleToList:[],
        // Attachment: "",

        Status: "Pending",
        Token:localStorage.ki 
      },
      FllwDate: "",
      showcalender: 'hidden',
      tasks:[""],
      scheduleBy:[""],
      scheduleTo:[],
      tasklist:[],
     }
   },
   methods: {
     addFile() {
       
       var that = this;
        if(Vue.cordova.camera) {
          Vue.cordova.camera.getPicture((imageURI) => {
            
              window.FilePath.resolveNativePath(imageURI, function success(fileEntry) {
                that.followup.Attachment = fileEntry;
                console.log(that.followup.Attachment)
                var uri = encodeURI("http://ptsv2.com/t/x3din-1548409558/post");
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = fileEntry.substr(fileEntry.lastIndexOf('/')+1);
                options.mimeType = "text/plain";
                var headers = {'headerParam':'headerValue'};
                options.headers = headers;
                var ft = new FileTransfer();
                ft.upload(fileEntry, uri, onSuccess, onError, options);

                function onSuccess(r) {
                    console.log("Code = " + r.responseCode);
                    console.log("Response = " + r.response);
                    console.log("Sent = " + r.bytesSent);
                }

                function onError(error) {
                    alert("An error has occurred: Code = " + error.code);
                    console.log("upload error source " + error.source);
                    console.log("upload error target " + error.target);
                }
                
              }, function () {
                
              });
            }, (message) => {
              window.alert('FAILED : ' + message)
            }, {
              quality: 50,
              destinationType: Vue.cordova.camera.DestinationType.FILE_URI,
              encodingType: Vue.cordova.camera.EncodingType.JPEG,
              sourceType: Vue.cordova.camera.PictureSourceType.PHOTOLIBRARY
            })
        }
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
      // var data = this.followup;
      this.followup.ProjectID = Utils.getProjectid();
      this.followup.CreatedDate = Utils.formatDate(new Date()).split("-").reverse().join("-");
      this.followup.FollowupDate = Utils.formatDate(new Date(this.FllwDate)).split("-").reverse().join("-");
      this.followup.ScheduleBy = Utils.getUsername();
      var arr = [];
      for (var i=0; i<this.followup.ScheduleToList.length; i++) {
        var user = this.followup.ScheduleToList[i].split('|');
        arr.push({'UserID' : user[0], 'UserName' : user[1]})

      }
      this.followup.ScheduleToList = arr;
      this.$validator.validate().then(valid => {

        if (valid) {
            var that  = this;
            this.intervalID = setInterval(() => {
              if (that.progress === 100) {
                clearInterval(this.intervalID);
                that.progress = 0;
                return;
              }
              that.progress++;
            }, 40);	 
            AddfollowupApi.addFollowup(this.followup).then(followups => {
              this.progress = 100;
              this.$router.back(-1);

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
    this.intervalID = setInterval(() => {
        if (this.progress === 100) {
          clearInterval(this.intervalID);
          this.progress = 0;
          return;
        }
        this.progress++;
      }, 40); 
    
    var payload = {
          Token:localStorage.ki,
          Department:user.Department,
          UserID:this.followup.UserID,
          Stage: "Enquiry", 
          projectId:Utils.getProjectid()

         }

    Utils.getTask(payload).then(task => {  
      
      for (var i=0; i<task.Body.length; i++) {
        this.tasklist[i] = task.Body[i].Task;         
      }
      // this.progress = 0;
      this.tasks = this.tasks.concat(this.tasklist);
      }),
       
      Utils.getScheduleto(payload).then(users => {
        this.progress = 0;
        clearInterval(this.intervalID); 
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
.followdate {
  height: 22px;
  border-bottom: 1px solid #ccc;
}
.userlist{
  height: 167px;
  width:100%;
  overflow: auto;
  margin-bottom: 15px;

}

</style>