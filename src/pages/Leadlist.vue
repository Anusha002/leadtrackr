<template>
	<v-ons-page id="leadlistpage">
		<v-ons-toolbar>
			<div class="left">
				<v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
			</div>
		</v-ons-toolbar>
		<h1 class="heading">{{this.dates}}</h1>
 		<v-ons-card>
 			<div class="content">	
				<span><b>{{contact_name}}</b></span>
				<p class="status" >{{status}}</p>
				<p>{{lead_name}}</p>
	 		</div> 						
 		</v-ons-card>

 		<h1 class="heading">{{this.dates}}</h1>
 		<v-ons-card>
 			<div class="content">	
				<span><b>{{contact_name}}</b></span>
				<p class="status" >{{status}}</p>
				<p>{{lead_name}}</p>
	 		</div> 	 						
 		</v-ons-card>

 		<h1 class="heading">{{this.dates}}</h1>
 		<v-ons-card>
 			<div class="content">	
				<span><b>{{contact_name}}</b></span>
				<p class="status" >{{status}}</p>
				<p>{{lead_name}}</p>
	 		</div> 	 						
 		</v-ons-card>
	</v-ons-page>
</template>

<script>
	export default {
		data() {
			return {
			"lead_name": "Global Agencies",
        	 "status": "Sale order released",
        	 "contact_name": "Ajay K"
			}
			dates: new Date()
		}
		

	}
</script> 