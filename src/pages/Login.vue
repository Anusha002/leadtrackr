<template>
  <v-ons-page>
   <div class="logindetails">

    <v-ons-list>
	    <v-ons-list-item>
	      <div class="center">
	        <v-ons-input type="text" name="username" placeholder="User name" v-model="input.username" v-validate="'required|min:3'" ></v-ons-input>
          <p class="text-danger" v-if="errors.has('username')">{{ errors.first('username')}}</p>   
	      </div>
	    </v-ons-list-item>
	    <v-ons-list-item>
	    	<div class="center">
	    		<v-ons-input type="password" name="password" placeholder="Password" v-model="input.password" v-validate="'required'" ></v-ons-input>
          <p class="text-danger" v-if="errors.has('password')">{{ errors.first('password')}}</p>  
	    	</div>
	    </v-ons-list-item>
	    <v-ons-list-item>
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

.logindetails {
  border: 1px;
  margin: 100px 20px;
  border-radius: 6px;
}


</style>      