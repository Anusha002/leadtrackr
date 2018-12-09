<template>
  <v-ons-page>
    <div class="logo">
      <img :src="require('../assets/lead-logo.png')" width="90"  />
      <h4>LeadTrackr</h4>
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
	    	<v-ons-button modifier="large" style="margin: 6px 0" @click="sendData()">Login</v-ons-button>
	    </v-ons-list-item>
	</v-ons-list>
</div>
  </v-ons-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
    	input: {
        username: '',
        password: ''
      },
	      
      submitted: false,
      response: {}
    }
  },
 
  methods: {
            sendData() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                  if (valid) {
                    axios({ method: "POST", "url": "/api/login", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
                        this.response = result.data;
                        localStorage.setItem("ki", this.response.Body.Token);
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
}

.box-list {
  border-radius: 10px;
}
.box-list .list-item {
  padding-right: 8px;
}
</style>      