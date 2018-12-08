<template >
	<v-ons-page id="splash">
		<div class="content">
			<v-ons-progress-circular v-if="loading" indeterminate></v-ons-progress-circular>
		</div>	
	</v-ons-page>
</template>
<script>
	import LoginApi from '@/services/api/login'
	export default {
		name: "Splash",
		data () {
			return{
				loading: true,
				user: {}
			}
		},
		created() {
			
			if (localStorage.ki) {
				LoginApi.getUser()
					.then(user => {
						this.loading = false,
						this.user = user;
						if (Object.keys(user).length > 0) {
							this.$router.push('/dash')
						}
					})
					.catch(error => {
						alert(error)
					})
			} else {
				this.$router.push('/login')
			}
		}

	}
</script>