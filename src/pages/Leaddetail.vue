<template>
	<v-ons-page id="leaddetailpage">	
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button @click="toggleMenu()">
	        		<v-ons-icon icon="md-chevron-left" size="28px" style="color: #fff; margin-left: 10px;" @click="goToHome()"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="center">
    		  Lead Details
	        </div>	
 		</v-ons-toolbar>	
		<div>
			<v-ons-card>
					<div class="content">
						<label class="label">Lead Name</label>
						<v-ons-row>
							<v-ons-col id="ld-comp-name">{{items.LeadName}}</v-ons-col>
						</v-ons-row>
						<label class="label">Contact Person</label>
						<v-ons-row>
							<v-ons-col id="ld-status" >{{items.ContactPerson}}</v-ons-col>
						</v-ons-row>
						<label class="label">CreatedByName</label>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{items.CreatedByName}}</v-ons-col>
						</v-ons-row>
						<label class="label">Followups</label>
						<v-ons-row>
							<v-ons-col id="ld-comp-name">{{items.Followups}}</v-ons-col>
						</v-ons-row>
						<label class="label">HandledByName</label>
						<v-ons-row>
							<v-ons-col id="ld-status" >{{items.HandledByName}}</v-ons-col>
						</v-ons-row>
						<label class="label">OwnerName</label>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{items.OwnerName}}</v-ons-col>
						</v-ons-row>
						<label class="label">Status</label>
						<v-ons-row>
							<v-ons-col id="ld-comp-name">{{items.Status}}</v-ons-col>
						</v-ons-row>
						<label class="label">Stage</label>
						<v-ons-row>
							<v-ons-col id="ld-status" >{{items.Stage}}</v-ons-col>
						</v-ons-row>
						<label class="label">Description</label>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{items.Description}}</v-ons-col>
						</v-ons-row>
						<label class="label">Followups</label>
						<v-ons-row>	
							<v-ons-col id="ld-name" >{{items.ProjectID}}</v-ons-col>
						</v-ons-row>
						<v-ons-row style="margin-top: 10px;">
							<v-ons-col width="50px">
								<a :href="'tel:' + items.Mobile">
									<v-ons-icon modifier="large" class="icon-phone"></v-ons-icon>
								</a>
							</v-ons-col>
							<v-ons-col>
								<a :href="'mailto:' + items.Email">
									<v-ons-icon modifier="large" class="icon-email"></v-ons-icon>
								</a>
							</v-ons-col>

						</v-ons-row>
					</div>
				</v-ons-card>
		</div>
	</v-ons-page>
</template>

<script>


export default {
	name: 'Leaddetail',
    props: ['items'],

	data() {
		return {
		
		}				
	 },
	 methods:{
	 	goToHome(){
        	this.$router.go(-1);
        	
   		}
	 }
}
			
</script> 
<style scoped>
	
.toolbar {
	background: transparent;
}

</style>