<template>
  <v-ons-page>
    <v-ons-progress-bar :value="progress"></v-ons-progress-bar>
      <div class="logo">
        <img src="../assets/lead-logo.png" width="90"  />
        <h4>LeadTracker</h4>
      </div>
      <div class="logindetails">
        <v-ons-list class="box-list">
          <v-ons-list-item modifier="nodivider">
            <div class="center">
              <v-ons-input type="text" modifier="underbar" class="lead-input" name="username" placeholder="User name" v-model="input.username" v-validate="'required|min:3'" ></v-ons-input>
              <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username')}}</p>   
            </div>
            </v-ons-list-item>
          <v-ons-list-item modifier="nodivider">
            <div class="center">
              <v-ons-input type="password" modifier="underbar" class="lead-input"  name="password" placeholder="Password" v-model="input.password" v-validate="'required'" ></v-ons-input>
              <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password')}}</p>  
            </div>
          </v-ons-list-item>
          <v-ons-list-item modifier="nodivider">
            <v-ons-button modifier="large" style="margin: 6px 0" @click="sendData()" class="button-normal">Login</v-ons-button>
          </v-ons-list-item>
        </v-ons-list>
      </div>
  </v-ons-page>
</template>

<script>
import LoginApi from '../services/api/User.js';

export default {
  data() {
    return {
      progress: 0,
      intervalID: 0,
    	input: {
        username: '',
        password: ''
      },     
      submitted: false,
      response: {}
    }
  },
   mounted:function () {
     this.$ons.ready(function(){
       try{
         window.FirebasePlugin.setScreenName("Login");
       } catch(e) {

       }
       
     })
     
   },
  methods: {
    sendData() {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
        this.intervalID = setInterval(() => {
        if (this.progress === 100) {
          clearInterval(this.intervalID);
          return;
          }
        this.progress++;
        }, 40);
        try{
          window.FirebasePlugin.logEvent("page_action", {content_type: "login", item_id: this.input.username});
        } catch(e){}
        
        LoginApi.login(this.input).then(user => {
          if(typeof user.response != 'undefined') {  
              this.progress = 0;      
              this.$ons.notification.alert(user.response.statusText)
            } else {
              this.progress = 0;
              clearInterval(this.intervalID);
              if(user.status == "True")
                {
                  localStorage.setItem("ki", user.Body.Token);
                  localStorage.setItem("usr", JSON.stringify(user.Body));
                  this.$router.push('/container');
                } else {
                  this.$ons.notification.alert(user.Message)
                }                   
              }  
           });               
        }            
     })
   }
 }
}
</script>  

<style scoped>

.page__background {

	background-color: #fff !important;

}
.logo{
  position: relative;
  left: 50%;
  margin-left: -45px;
  top: 40px;
}
.logo h4 {
  color: #fff;
}

.logindetails {
  border: 1px;
  margin: 100px 20px;
  border-radius: 6px;
  background-color: #fff;
}

.box-list {
  border-radius: 10px;
}
.box-list .list-item {
  padding-right: 8px;
}
</style>      