<template id="container">
	

	<v-ons-splitter>
		<v-ons-toolbar>
    		<div class="left">
	      		<v-ons-toolbar-button @click="toggleMenu()">
	        		<v-ons-icon class="icon-hamburger header-icon"></v-ons-icon>	
	      		</v-ons-toolbar-button>
    		</div>
    		<div class="right">
    			<v-ons-toolbar-button @click="toggleView()">
	        		<v-ons-icon class="icon-list header-icon" id="leadicon"></v-ons-icon>
	        	</v-ons-toolbar-button>	
	        </div>	
 		</v-ons-toolbar>
		<v-ons-splitter-side swipeable width="150px" collapse="" side="left"
		:open.sync="openSide" class="frame" id="menu">	
			<v-ons-page>
				<v-ons-list>
					<v-ons-list-item v-for="page in pages" 
					tappable modifier="chevron"
					@click="currentPage = page; openSide = false"
					>
						<div class="center">{{ page }}</div>
					</v-ons-list-item>
				</v-ons-list>
			</v-ons-page>
		</v-ons-splitter-side>
		<v-ons-splitter-content  class="frame"	>
			<component :is="currentPage" :toggle-menu="() => openSide = !openSide"></component>
		</v-ons-splitter-content>

     </v-ons-splitter> 
</template>
<script>
	import Dash from '../pages/Dash.vue';
	import Logout from '../pages/Logout.vue';
	import Leadlist from '../pages/Leadlist.vue';
	import Addlead from '../pages/Addlead.vue';
	import Followups from '../pages/Followups.vue'
	export default{
		name: "Container",
		components: {
			Dash,
			Logout,
			Leadlist,
			Addlead,
			Followups
		},
		methods: {
			toggleMenu()  {
				this.openSide = ((this.openSide) ? false : true);
			},
			toggleView() {
				console.log(document.getElementById('leadicon').classList.contains("icon-list"))
				
				if (document.getElementById('leadicon').classList.contains("icon-list")){
					this.currentPage = 'Leadlist'
					document.getElementById('leadicon').classList.remove("icon-list"); 
					document.getElementById('leadicon').classList.add("icon-calender"); 
				} else{
					this.currentPage = 'Dash'
					document.getElementById('leadicon').classList.remove("icon-calender"); 
					document.getElementById('leadicon').classList.add("icon-list"); 
				}
				
			}
		},
		data() {
			return {
				currentPage: 'Dash',
				pages: ['Dash','Leadlist','Addlead','Followups','Logout'],
				openSide: false
				};
			},
	}
</script>
<style >
	.frame {
		padding-top: 40px;
	}
	.frame .page__content {
		margin-top: 50px;
	}
	#menu .page__background {
		background: #fff;
	}
	.icon-list .icon-calender{
		margin:20px;
	}
	.header-icon {
		font-size: 1.2em !important;
	}
</style>