<template>
	<v-ons-page id="leaddetailpage">
		<h1 class="heading">{{lead_name}}</h1>
 		<v-ons-card>
 			<div class="content">	
				<span><b>{{contact_name}}</b></span>
				<p class="status" >{{status}}</p>
	 		</div> 						
 		</v-ons-card>

 		<h1 class="heading">Follow UPS</h1>
 		<v-ons-card>
 			<div class="content">	
				<span><b>Call {{contact_name}}<br> For Demo</b></span>
				
	 		</div> 	

	 		<v-ons-list-item>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px">Mark Completed</v-ons-button>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px">Update</v-ons-button>
	    		<v-ons-button class="btnclass" style="margin: 4px 4px">Reassign</v-ons-button>
	    	</v-ons-list-item>					
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
		}
	}
</script> 

<style>

.page__content h1 {
    font-size: 22px;
}
.status{
	color: green;
	font-weight: bold;
}

.btnclass{
	font-size: 14px;
	color: "black";
	background-color: grey;

}

</style>