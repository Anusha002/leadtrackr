<template>
	<v-ons-page class="logoutdata"> 
		Logged out successfully
	 </v-ons-page>  
</template>
<script>
import LogoutApi from '../services/api/User.js';
	export default {
		name: "Logout",
		data () {
			return{
				
			}
		},
		created:function() {
			var usr = {
				"UserID" : JSON.parse(localStorage.getItem("usr")).UserID.toString(),
 				 "Token" : localStorage.getItem("ki")
				}
				try{
					window.FirebasePlugin.setScreenName("Logout");
				} catch(e){}
				
			LogoutApi.logout(usr).then(user => {
				
				localStorage.removeItem('ki');
				localStorage.removeItem('usr');
				this.$router.push('/login');
			})
	}
}			
</script>
<style>
.logoutdata{
	text-align: center;
	padding: 100px;
	color: #fff;
}
</style>